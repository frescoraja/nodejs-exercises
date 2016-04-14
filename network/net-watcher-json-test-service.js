'use strict';

const
  net = require('net'),
  server = net.createServer(function(connection) {
    console.log("Subscriber connected.");
    
    //send first chunk immediately
    connection.write(
      '{"type": "changed", "file": "targ'
    );

    //after one second delay, send other chunk
    let timer = setTimeout(function() {
      connection.write('et.txt", "timestamp": 1358175758495 }' + '\n');
      connection.end();
    }, 1000);

    connection.on('end', function() {
      clearTimeout(timer);
      console.log("Subscriber disconnected.");
    });

  });

server.listen(5432, function() {
  console.log("Test server listening for subscribers..");
});
