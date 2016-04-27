function xforml(o1, o2, isServer) {
	if (o1["o"] == "i") {
		if (o2["o"] == "i") {
			if (o1["k"] < o2["k"])  { o2["k"]++; return [o1, o2] }
			if (o1["k"] > o2["k"])  { o1["k"]++; return [o1, o2] }
			if (o1["k"] == o2["k"]) { o2["k"]++; return [o1, o2] }
		}
		if (o2["o"] = "d") {
			if (o1["k"] < o2["k"])  { o2["k"]++; return [o1, o2] }
			if (o1["k"] > o2["k"])  { o2["k"]--; return [o1, o2] }
			if (o1["k"] < o2["k"])  { o2["k"]++; return [o1, o2] }
		}
	}
	if (o2["o"] == "d") {
		if (o2["o"] == "i") {
			if (o1["k"] < o2["k"])  { o2["k"]--; return [o1, o2] }
			if (o1["k"] > o2["k"])  { o1["k"]++; return [o1, o2] }
			if (o1["k"] == o2["k"]) { o1["k"]++; return [o1, o2] }
		}
		if (o2["o"] = "d") {
			if (o1["k"] < o2["k"])  { o2["k"]--; return [o1, o2] }
			if (o1["k"] > o2["k"])  { o1["k"]--; return [o1, o2] }
			if (o1["k"] < o2["k"])  { return [{"o":"n"}, {"o":"n"}]}
		}
	}
}

function xformgii(op1, op2) {
	if (op1.k.length > op2.k.length) {
		if (op2.k.isSublistOf(op2.k)) {
			if ( op1.k[op2.k.length] >= op2.i ) {
				op1.k[op2.k.length]++;
				return [op1, op2];
			} else if (op1.k[op2.k.length] < op2.i ) {
				return [op1, op2];
			}
		} else {
			return [op1, op2];
		}
	} else if (op1.k.length < op2.k.length) {
		if (op1.k.isSublistOf(op2.k)) {
			if (op2.k[op1.k.length] >= op1.i) {
				op2.k[op1.length]++;
				return [op1, op2];
			} else if (op2.k[op1.k.length]) {
				return [op1,op2];
			}
		} else {
			return [op1,op2];
		}
	} else if (op1.k.length == op2.k.length) {
		if (op1.k.isSublistOf(op2.k)) {
			if (op1.i > op2.i) {
				op1.i++;
				return [op1,op2];
			} else if (op1.i < op2.i) {
				op2.i++;
				return [op1,op2];
			} else if (op1.i == op2.i) {
				if (isServer) {
					op1.i++;
					return [op1,op2];
				} else {
					op2.i++;
					return [op1,op2];
				}
			} else {
				return [op1,op2];
			}
		}
	}
}

function xformgid(op1, op2) {
	if (op1.k.length > op2.k.length) {
		if (op2.k.isSublistOf(op1.k)) {
				if (op1.k[op2.k.length] > op2.i)

function isSublistOf(k) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] != k[i]) {return false;}
	}
	return true;
}
