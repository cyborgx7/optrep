function xformg(o1, o2, isServer) {
	console.log(o1.o);
	console.log(o2.o);
	if (o1.o == "i") {
		console.log("i");
		if (o2["o"] == "i") {
			return xformgii(o1,o2,isServer);
		}
		if (o2["o"] = "d") {
			return xformgid(o1,o2);
		}
	}
	if (o1.o == "d") {
		console.log('d');
		if (o2["o"] == "i") {
			return xformgid(o2,o1);
		}
		if (o2["o"] = "d") {
			return xformgdd(o1,o2);
		}
	}
}

function xformgii(op1, op2) {
	var tpt = transformationPoint(o1.k,o2.k);

	if (effectIndependant(o1.k,o2.k)) {return [o1,o2];}

	if (o1.k[tpt] > o2.k[tpt] {
		o1.k[tpt]++;
		return [o1,o2];	
	}

	if (o1.k[tpt] < o2.k[tpt] {
		o2.k[tpt]++;
		return [o1,o2];
	}

	if (o1.k[tpt] == o2.k[tpt]){
		if (o1.k.length > o2.k.length) {
			o1.k[tpt]++;
			return [o1,o2];
		}

		if (o1.k.length < o2.k.length) {
			o2.k[tpt]++;
			return [o1,o2];
		}

		if (o1.k.length == o2.k.length) {
			//application depndent priorities
		}
	}
}

function xformgid(op1, op2) {
	var tpt = transformationPoint(o1.k,o2.k);

	if (effectIndependant(o1.k,o2.k)) {return [o1,o2];}

	if (o1.k[tpt] > o2.k[tpt] {
		o1.k[tpt]--;
		return [o1,o2];	
	}

	if (o1.k[tpt] < o2.k[tpt] {
		o2.k[tpt]++;
		return [o1,o2];
	}

	if (o1.k[tpt] == o2.k[tpt]){
		if (o1.k.length > o2.k.length) {
			o1.o = "n";
			return [o1,o2];
		}

		o2.k[tpt]++;
	}

}

function xformgdd(op1,op2) {
	var tpt = transformationPoint(o1.k,o2.k);

	if (effectIndependant(o1.k,o2.k)) {return [o1,o2];}

	if (o1.k[tpt] > o2.k[tpt] {
		o1.k[tpt]--;
		return [o1,o2];	
	}

	if (o1.k[tpt] < o2.k[tpt] {
		o2.k[tpt]--;
		return [o1,o2];
	}

	if (o1.k[tpt] == o2.k[tpt]){
		if (o1.k.length > o2.k.length) {
			o1.o = "n";
			return [o1,o2];
		}

		if (o1.k.length < o2.k.length) {
			o2.o = "n";
			return [o1,o2];
		}

		if (o1.k.length == o2.k.length) {
			o1.o = "n";
			o2.o = "n";
			return [o1,o2];
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

function effectIndipendent(k1,k2) {
	var tpt = transformationPoint(k1,k2);
	if ((k1.length > tpt+1) and (k2.length > tpt+1)) {return true;}
	if ((k1[tpt] > k2[tpt]) and (k1.length < k2.length)) {return true;}
	if ((k1[tpt] < k2[tpt]) and (k1.length > k2.length)) {return true;}
	return false;
}
