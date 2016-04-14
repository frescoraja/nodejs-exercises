"use strict";
const
  fs = require("fs"),
  spawn = require("child_process").spawn,
  filename = process.argv[2];

var 
  command = process.argv[3],
  len = process.argv.length,
  tags = process.argv.slice(4, len).join("").replace(/\-/g, "");

if (!filename) {
  throw Error("A file to watch must be specified!");
}

if (command !== 'ls') {
  command = 'ls';
}

if (!tags) {
  tags = '-l';
} else {
  tags = '-' + tags;
}

fs.watch(filename, function() {
  let ls = spawn(command, [tags, filename]);
  ls.stdout.pipe(process.stdout);
});

console.log("Now watching " + filename + " for changes...");
