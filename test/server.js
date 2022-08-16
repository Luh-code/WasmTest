var http = require('http');
var url = require('url');
var fs = require('fs');

function fileEndingExtractor(file) {
    var parts = file.split(".");
    console.log(parts);
    return parts[parts.length-1];
}

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    switch (end = fileEndingExtractor(filename))
    {
        case 'wasm':
            res.writeHead(200, {'Content-Type': 'application/wasm'});
            break;
        case 'html':
            res.writeHead(200, {'Content-Type': 'text/html'});
            break;
        case 'js':
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            console.error("Unsupported file ending: " + end);
            return res.end("404 Not Found");
    }
    console.log(filename);
    res.write(data);
    return res.end();
  });
}).listen(8080); 