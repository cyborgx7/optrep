http   = require("http");
fs     = require("fs");
eventEmitter = require("events").EventEmitter;

index = fs.readFileSync("xhrtest.html");
filexforml = fs.readFileSync("xforml.js");

vm = require("vm");
vm.runInThisContext(filexforml);

//Create event for recieving an operation
var opHandler = new eventEmitter();
//Initialize UUID
var nextUuid = 0;

//cookie parser
function parseCookies (cookies) {
	var parsed = {};
	cookies.split(";").forEach(function(cookie) {
		var elems = cookies.split("=");
		parsed[elems[0]] = elems[1];
	});
	return parsed;
}

//request handler
server = http.createServer( function (request, response) {
	console.log("recieve");
	if (request.method == "GET") {
		console.log("get");
		if (request.url == "/optrep") {
			console.log("optrep");
			response.setHeader("Set-Cookie", ["uid="+nextUuid]);
			nextUuid++;
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end(index);
		} if (request.url == "/xforml.js") {
			console.log("xforml");
			response.writeHead(200, {"Content-Type": "text/JavaScript"});
			response.end(filexforml);
		} else { console.log(request.url);};
	} else if (request.method == "POST") {
		console.log("post");
		if (request.url == "/newOp") { //handle recieving new events
			console.log("newop")
			//assemble body
			var body = "";
			request.on("data", function (chunk) {
				body += chunk;
			});
			request.on("end", function () {
			console.log(body);
			//get uid
			var opUid = parseCookies(request.headers.cookie)["uid"];
			opHandler.emit("newOp", body, opUid);
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end("success");
			});
		} else if (request.url == "/wait") { //handle waiting for events
			console.log("wait");
			console.log(request.headers.cookie);
			console.log(parseCookies(request.headers.cookie));
			
			opHandler.once("newOp", function (op, opUid) {
				response.writeHead(200, {"Content-Type": "text/html"});
				if (opUid == parseCookies(request.headers.cookie)["uid"]) {
					response.end(JSON.stringify({"o":"a"})); //send acknowledge
				} else {
					response.end(op); //send operation
				}
			});
		}
	}
});

server.listen(9236);
