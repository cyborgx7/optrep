http   = require("http");
fs     = require("fs");
eventEmitter = require("events").EventEmitter;

index = fs.readFileSync("xhrtest.html");

//Create event for recieving an operation
var opHandler = new eventEmitter();


//request handler
server = http.createServer( function (request, response) {
	console.log("recieve");
	if (request.method == "GET") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(index);
	} else if (request.method == "POST") {
		if (request.url == "/newOp") { //handle recieving new events
			var body = "";
			request.on("data", function (chunk) {
				body += chunk;
			});
			request.on("end", function () {
			console.log(body);
			opHandler.emit("newOp", body);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end("success");
			});
		} else if (request.url == "/wait") { //handle waiting for events
			opHandler.on("newOp", function (op) {
				response.writeHead(200, {"Content-Type": "text/html"});
				response.end(op);
			});
		}
	}
});

server.listen(9236);
