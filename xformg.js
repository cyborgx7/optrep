function xformg(op1, op2, isServer) {
	console.log(op1);
	console.log(op2);
	if (op1.o == "i") {
		console.log("1i");
		if (op2.o == "i") {
			console.log("2i");
			return xformgii(op1,op2,isServer);
		}
		if (op2.o == "d") {
			console.log("2d");
			return xformgid(op1,op2);
		}
	}
	if (op1.o == "d") {
		console.log('d');
		if (op2["o"] == "i") {
			var xformed = xformgid(op2,op1);
			return [xformed[1],xformed[0]];
		}
		if (op2["o"] == "d") {
			return xformgdd(op1,op2);
		}
	}
	return [op1,op2]; //in case of other operation types (no-op)
}

function xformgii(op1, op2, isServer) {
	var tpt = transformationPoint(op1.k,op2.k);
	console.log(tpt);

	if (effectIndependent(op1.k,op2.k)) {console.log("trans11"); return [op1,op2];}

	if (op1.k[tpt] > op2.k[tpt]) {
		console.log("trans12");
		op1.k[tpt]++;
		return [op1,op2];	
	}

	if (op1.k[tpt] < op2.k[tpt]) {
		console.log("trans13");
		op2.k[tpt]++;
		return [op1,op2];
	}

	if (op1.k[tpt] == op2.k[tpt]) {
		console.log("trans14");
		if (op1.k.length > op2.k.length) {
			op1.k[tpt]++;
			return [op1,op2];
		}

		if (op1.k.length < op2.k.length) {
			op2.k[tpt]++;
			return [op1,op2];
		}

		if (op1.k.length == op2.k.length) {
			//application depndent priorities
			if(isServer) {
				op1.k[tpt]++;
				return [op1,op2];
			} else {
				op2.k[tpt]++;
				return [op1,op2];
			}
		}
	}
}

function xformgid(op1, op2) {
	var tpt = transformationPoint(op1.k,op2.k);
	console.log(tpt);

	if (effectIndependent(op1.k,op2.k)) {console.log("efin"); return [op1,op2];}

	if (op1.k[tpt] > op2.k[tpt]) {
		console.log("trabs1");
		op1.k[tpt]--;
		return [op1,op2];	
	}

	if (op1.k[tpt] < op2.k[tpt]) {
		console.log("trans2");
		op2.k[tpt]++;
		return [op1,op2];
	}

	if (op1.k[tpt] == op2.k[tpt]) {
		console.log("trans3");
		if (op1.k.length > op2.k.length) {
			op1.o = "n";
			return [op1,op2];
		}

		op2.k[tpt]++;
		return [op1,op2];
	}

}

function xformgdd(op1,op2,isServer) {
	var tpt = transformationPoint(op1.k,op2.k);
	console.log(tpt);

	if (effectIndependent(op1.k,op2.k)) {return [op1,op2];}

	if (op1.k[tpt] > op2.k[tpt]) {
		op1.k[tpt]--;
		return [op1,op2];	
	}

	if (op1.k[tpt] < op2.k[tpt]) {
		op2.k[tpt]--;
		return [op1,op2];
	}

	if (op1.k[tpt] == op2.k[tpt]) {
		if (op1.k.length > op2.k.length) {
			op1.o = "n";
			return [op1,op2];
		}

		if (op1.k.length < op2.k.length) {
			op2.o = "n";
			return [op1,op2];
		}

		if (op1.k.length == op2.k.length) {
			op1.o = "n";
			op2.o = "n";
			return [op1,op2];
		}
	}

}

function CONFLICT_HANDLER(op1,op2) {
	op1.o = 'n';
	return [op1,op2];
}

function isSublistOf(k1,k2) {
	if (k1.length > k2.length) {return false;}
	for (var i = 0; i < k1.length; i++) {
		if (k1[i] != k2[i]) {return false;}
	}
	return true;
}

function transformationPoint(k1,k2) {
	var smallLength = k1.length > k2.length ? k2.length : k1.length;
	for (var i = 0; i < smallLength; i++) {
		if (k1[i] != k2[i]) {return i;}
	}
	return smallLength-1;
}

function effectIndependent(k1,k2) {
	var tpt = transformationPoint(k1,k2);
	if ((k1.length > tpt+1) && (k2.length > tpt+1)) {return true;}
	if ((k1[tpt] > k2[tpt]) && (k1.length < k2.length)) {return true;}
	if ((k1[tpt] < k2[tpt]) && (k1.length > k2.length)) {return true;}
	return false;
}
