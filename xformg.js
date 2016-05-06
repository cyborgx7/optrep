function xformg(op1, op2) {
	console.log(op1.o);
	console.log(op2.o);
	if (op1.o == "i") {
		console.log("i");
		if (op2["o"] == "i") {
			return xformgii(op1,op2);
		}
		if (op2["o"] = "d") {
			return xformgid(op1,op2);
		}
	}
	if (op1.o == "d") {
		console.log('d');
		if (op2["o"] == "i") {
			var xformed = xformgid(op2,op1);
			return [xformed[1],xformed[0]];
		}
		if (op2["o"] = "d") {
			return xformgdd(op1,op2);
		}
	}
}

function xformgii(op1, op2) {
	var tpt = transformationPoint(op1.k,op2.k);

	if (effectIndependent(op1.k,op2.k)) {return [op1,op2];}

	if (op1.k[tpt] > op2.k[tpt]) {
		op1.k[tpt]++;
		return [op1,op2];	
	}

	if (op1.k[tpt] < op2.k[tpt]) {
		op2.k[tpt]++;
		return [op1,op2];
	}

	if (op1.k[tpt] == op2.k[tpt]) {
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
		}
	}
}

function xformgid(op1, op2) {
	var tpt = transformationPoint(op1.k,op2.k);

	if (effectIndependent(op1.k,op2.k)) {return [op1,op2];}

	if (op1.k[tpt] > op2.k[tpt]) {
		op1.k[tpt]--;
		return [op1,op2];	
	}

	if (op1.k[tpt] < op2.k[tpt]) {
		op2.k[tpt]++;
		return [op1,op2];
	}

	if (op1.k[tpt] == op2.k[tpt]) {
		if (op1.k.length > op2.k.length) {
			op1.o = "n";
			return [op1,op2];
		}

		op2.k[tpt]++;
	}

}

function xformgdd(op1,op2) {
	var tpt = transformationPoint(op1.k,op2.k);

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
	if (isSublistOf(k1,k2)) {
		return k1.length-1;
	}
	if (isSublistOf(k2,k1)) {
		return k2.length-1
	}
}

function effectIndependent(k1,k2) {
	var tpt = transformationPoint(k1,k2);
	if ((k1.length > tpt+1) && (k2.length > tpt+1)) {return true;}
	if ((k1[tpt] > k2[tpt]) && (k1.length < k2.length)) {return true;}
	if ((k1[tpt] < k2[tpt]) && (k1.length > k2.length)) {return true;}
	return false;
}
