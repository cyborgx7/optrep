http  = require("http");
fs    = require("fs");
index = fs.readFileSync("xhrtest.html");

server = http.createServer( function (request, response) {
	console.log("recieve");
	if (request.method == "GET") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(index);
	} else if (request.method == "POST") {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end("success");
	}
});

server.listen(9236);
