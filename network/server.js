"use strict";
const
  net = require('net'),
  portNum = process.argv[2] || 5432,
  server = net.createServer(function(connection) {
    //use connection object
  });

server.listen(portNum, function(req, res) {
  console.log("connected on port " + portNum);
});
