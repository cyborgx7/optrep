function genop(graph) {
	if (graph[0] != "{}") {
		return {o:"n"};
	}
	var path = [];
	return genObj(graph, path);
}

function genObj(node, path) {
	console.log("obj");
	console.log(node);
	if (node[1].length == 0) {
		//empty object, insert key node
		path.push(0);
		var keyNode = newKey();
		return {o:"i", k:path, c:keyNode};
	} else if (Math.random() < 0.3) {
		//generate operation on this node
		if (Math.random() < 0.5) {
			var keyNode = newKey();
			path.push(Math.floor(Math.random() * (node[1].length+1)));
			return {o:"i", k:path, c:keyNode};
		} else {
			path.push(Math.floor(Math.random() * node[1].length));
			return {o:"d", k:path};
		}
	} else {
		var nextNode = Math.floor(Math.random() * node[1].length);
		path.push(nextNode);
		return genKey(node[1][nextNode], path);
	}
}

function genKey(node, path) {
	console.log("key");
	console.log(node);
	return genValue(node[1], path);
}

function genValue(node, path) {
	console.log("val");
	console.log(node);
	if (node[0] == "{}") {
		return genObj(node, path);
	} else if (node[0] =="[]") {
		return genArray(node, path);
	} else {
		//reached leaf-node, return no-op, can't delete because it could be the value of a key node
		return {o:"n"};
	}
}

function genArray(node, path) {
	console.log("arr");
	console.log(node);
	if (node[1].length == 0) {
		path.push(0);
		var valueNode = newValue();
		return {o:"i", k:path, c:valueNode};
		//empty array, insert value node
	} else if (Math.random() < 0.3) {
		if (Math.random() < 0.5) {
			var valueNode = newValue();
			path.push(Math.floor(Math.random() * (node[1].length+1)));
			return {o:"i", k:path, c:valueNode};
		} else {
			path.push(Math.floor(Math.random() * node[1].length));
			return {o:"d", k:path};
		}
		//generate operation on this node
	} else {
		var nextNode = Math.floor(Math.random() * node[1].length);
		path.push(nextNode);
		return genValue(node[1][nextNode], path);
	}
}

function newValue() {
	console.log("nval");
	var decider = Math.random();
	if (decider < 1/3) {
		return ["{}",[]];
	} else if (decider < 2/3) {
		return ["[]",[]];
	} else {
		//leafnode with random string
		return [(Math.random().toString(36)+'00000000000000000').slice(2, 7), []];
	}
}

function newKey() {
	console.log("nkey");
	var key = (Math.random().toString(36)+'00000000000000000').slice(2, 7);
	var val = newValue();
	return [key, val];
}
