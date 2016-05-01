'use strict';

const
  cluster = require('cluster'),
  zmq = require('zmq');

if (cluster.isMaster) {

  let
    pusher = zmq.socket('push').bind('ipc://pusher.ipc'),
    puller = zmq.socket('pull').bind('ipc://puller.ipc'),
    
    readyCount = 0,

    sendWork = function() {
      for (var i = 0; i < 30; i++) {
        pusher.send(JSON.stringify({ index: i }));
      }
    };

  puller.on('message', function(data) {
    let message = JSON.parse(data);
    if (message.ready) {
      readyCount += 1;
      if (readyCount === 3) {
        sendWork();
      }
    } else if (message.result) {
      console.log("Received: " + data);
    }    
  });

  cluster.on('online', function(worker) {
    console.log("Worker " + worker.process.pid + " is online.");
  });

  cluster.on('exit', function(worker) {
   console.log("Worker " + worker.process.pid + " is offline...");
   cluster.fork();
  });

  for (let i = 0; i < 3; i++) {
    cluster.fork();
  }

} else {
  let
    puller = zmq.socket('pull').connect('ipc://pusher.ipc'),
    pusher = zmq.socket('push').connect('ipc://puller.ipc');

  puller.on('message', function(data) {
    let job = JSON.parse(data);
    console.log(process.pid + " received job: " + job.index);
    pusher.send(JSON.stringify({
      index: job.index,
      pid: process.pid,
      result: 'success'
    }));
  });

  pusher.send(JSON.stringify({
    pid: process.pid,
    ready: true
  }));
}
