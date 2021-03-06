"use strict";
const
  fs = require('fs'),
  zmq = require('zmq'),

  //create publisher endpoint
  publisher = zmq.socket('pub'),

  filename = process.argv[2];

fs.watch(filename, function() {

  //send message to any subscribers
  publisher.send(JSON.stringify({
    type: 'change',
    file: filename,
    timestamp: Date.now()
  }));

});

//listen on TCP port 5444
publisher.bind("tcp://*:5444", function(err) {
    console.log("Listening for subscribers...");
});
