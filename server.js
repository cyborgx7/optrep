http  = require("http");
fs    = require("fs");
index = fs.readFileSync("list.html");

server = http.createServer( function (request, response) {
	console.log(request);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(index);
});

server.listen(9236);
