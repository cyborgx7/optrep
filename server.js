http   = require("http");
fs     = require("fs");
eventEmitter = require("events").EventEmitter;

index = fs.readFileSync("xforml.html");
filexforml = fs.readFileSync("xforml.js");
filexformg = fs.readFileSync("xformg.js");
filegenop = fs.readFileSync("genop.js");

vm = require("vm");
vm.runInThisContext(filexforml);
//vm.runInThisContext(filexformg);

//Create event for recieving an operation
var opHandler = new eventEmitter();
//Initialize UUID
var nextUuid = 0;
//Initialize operation history
var hist = [];
//Initialize broadcast history
var broad = [];

//cookie parser
function parseCookies (cookies) {
	if (!cookies) { return {} }
	var parsed = {};
	cookies.split(";").forEach(function(cookie) {
		var elems = cookies.split("=");
		parsed[elems[0]] = elems[1];
	});
	return parsed;
}

function transform(op) {
	console.log("transform");
	for (var i = op["rn"]; i < hist.length; i++){
		console.log("cycle");
		console.log(op)
		console.log(hist[i]);
		//var xformed = xforml(op, hist[i]);
		var xformed = xforml(JSON.parse(JSON.stringify(op)), JSON.parse(JSON.stringify(hist[i])), true);
		var op = xformed[0];
		//hist[i] = xformed[1];
	}
	return op
}

function opWait(uid, rev, response) {
	console.log(rev);
	if (rev < broad.length) {
		response.writeHead(200, {"Content-Type": "text/html"});
		var op = broad[rev];
		if (op.u == uid) {
			response.end(JSON.stringify({"o":"a"})); //send acknowledge
		} else {
			response.end(JSON.stringify(op));
		}
	} else {
		opHandler.once("newOp", function () {opWait(uid,rev,response)});
	}
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
		} else if (request.url == "/xforml.js") {
			console.log("xforml");
			response.writeHead(200, {"Content-Type": "text/JavaScript"});
			response.end(filexforml);
		} else if (request.url == "/xformg.js") {
			console.log("xformg");
			response.writeHead(200, {"Content-Type": "text/JavaScript"});
			response.end(filexformg);
		} else if (request.url == "/genop.js") {
			console.log("genop");
			response.writeHead(200, {"Content-Type": "text/JavaScript"});
			response.end(filegenop);
		} else { console.log(request.url);}
	} else if (request.method == "POST") {
		console.log("post");
		//assemble body
		var body = "";
		request.on("data", function (chunk) {
			body += chunk;
		});
		request.on("end", function () {
		console.log(body);
		if (request.url == "/newOp") { //handle recieving new events
			console.log("newop")
			var op = JSON.parse(body);
			op = transform(op);
			hist.push(op);
			//get uid
			var opUid = parseCookies(request.headers.cookie)["uid"];
			op.u = opUid;
			broad.push(JSON.parse(JSON.stringify(op)));
			opHandler.emit("newOp");
			response.writeHead(200, {"Content-Type": "text/html"});
			response.end("success");
		} else if (request.url == "/wait") { //handle waiting for events
			console.log("wait");
			console.log(request.headers.cookie);
			console.log(parseCookies(request.headers.cookie));
			opWait(parseCookies(request.headers.cookie)["uid"], body, response);
		}
		});
	}
});

server.listen(9236);
