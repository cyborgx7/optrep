http  = require("http");
fs    = require("fs");
index = fs.readFileSync("xhrtest.html");

server = http.createServer( function (request, response) {
	console.log("recieve");
	if (request.method == "GET") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(index);
	} else if (request.method == "POST") {
		var body = "";
		console.log(request);
		request.on("data", function (chunk) {
			body += chunk;
		});
		request.on("end", function () {
		console.log(body);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(body);
		});
	}
});

server.listen(9236);
