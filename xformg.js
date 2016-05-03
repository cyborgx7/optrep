function xforml(o1, o2, isServer) {
	if (o1["o"] == "i") {
		if (o2["o"] == "i") {
			return xformgii(op1,op2,isServer);
		}
		if (o2["o"] = "d") {
			return xformgid(op1,op2);
		}
	}
	if (o2["o"] == "d") {
		if (o2["o"] == "i") {
			return xformgid(op2,op1);
		}
		if (o2["o"] = "d") {
			return xformgdd(op1,op2);
		}
	}
}

function xformgii(op1, op2, isServer) {
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
			if (op1.k[op2.k.length] > op2.i) {
				op1.k[op2.k.length]--;
				return [op1,op2];
			} else if (op1.k[op2.k.length] == op2.i) {
				return CONFLICT_HANDLER(op1,op2);
			} else {
				return [op1,op2];
			}
		}
	} else if (op1.k.length < op2.k.length) {
		if (op1.k.isSublistOf(op2.k)) {
			if (op2.k[op1.k.length] >= op1.i) {
				op2.k[op1.k.length]++;
				return [op1,op2];
			} else if (op2.k[op1.k.length] < op1.i) {
				return [op1,op2];
			}
		} else {
			return [op1,op2];
		}
	} else if (op1.k.length == op2.k.length) {
		if (op1.k.isSublistOf(op2.k)) {
			if (op1.i < op2.i) {
				op2.i++;
				return [op1,op2];
			}
			if (op1.i > op2.i) {
				op1.i--;
				return [op1,op2];
			}
			if (op1.i == op2.i) {
				op2.i++;
				return [op1,op2];
			}
		} else {
			return [op1,op2];
		}
	}
}

function xformgdd(op1,op2) {
	if (op1.k.length > op2.k.length) {
		if (op2.k.isSublistOf(op1.k)) {
			if (op1.k.length > op1.i) {
				op1.k[op2.k.length]--;
				return [op1,op2];
			}
			if (op1.k[op2.k.length] == op2.i) {
				op1.o = 'n';
				return [op1,op2];
			}
		} else {
			return [op1,op2];
		}
	} else if (op1.k.length < op2.k.length) {
		if (op1.k.isSublistOf(op2.k)) {
			if (op2.k[op2.k.length] > op1.i) {
				op2.k[op1.k.length]--;
				return [op1,op2];
			}
			if (op2.k[op1.k.length] == op1.i) {
				op2.o = 'n';
				return [op1,op2];
			}
		} else {
			return [op1,op2];
		}
	} else if (op1.k.length == op2.k.length) {
		if (op1.k.isSublistOf(op2.k)) {
			if (op1.i < op2.i) {
				op2.i--;
				return [op1,op2];
			}
			if (op1.i > op2.i) {
				op1.i--;
				return [op1,op2];
			}
			if (op1.i == op2.i) {
				op1.o = 'n';
				op2.o = 'n';
				return [op1,op2];
			}
		} else {
			return [op1,op2];
		}
	}
}

function CONFLICT_HANDLER(op1,op2) {
	op1.o = 'n';
	return [op1,op2];
}

function isSublistOf(k) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] != k[i]) {return false;}
	}
	return true;
}
