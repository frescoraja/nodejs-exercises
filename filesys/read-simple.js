const 
  fs = require('fs'),
  filename = process.argv[2];

if (!filename) {
  throw Error("Must specify a file to read!");
}

fs.readFile(filename, function(err, data) {
  if (err) {
    throw err;
  }
  console.log(data.toString());
});
