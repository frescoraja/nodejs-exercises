"use strict";
const
  fs = require("fs"),
  filename = process.argv[2],
  content = process.argv.slice(3, process.argv.length).join(" ");
console.log(content);
if (!filename) {
  throw Error("Must specify a filename to write!");
}

if (!content) {
  throw Error("Must specify content to write to file!");
}

fs.writeFile(filename, content, function (err) {
  if (err) {
    throw err;
  }
  console.log("File saved!");
});
