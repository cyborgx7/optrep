function xforml(o1, o2, isServer) {
	if (o1["o"] == "i") {
		if (o2["o"] == "i") {
			if (o1["k"] < o2["k"])  {console.log("t1"); o2["k"]++; return [o1, o2] }
			if (o1["k"] > o2["k"])  {console.log("t2"); o1["k"]++; return [o1, o2] }
			if (o1["k"] == o2["k"]) {console.log("t3"); o2["k"]++; return [o1, o2] }
		}
		if (o2["o"] = "d") {
			if (o1["k"] < o2["k"])  {console.log("t4"); o2["k"]++; return [o1, o2] }
			if (o1["k"] > o2["k"])  {console.log("t5"); o1["k"]--; return [o1, o2] }
			if (o1["k"] == o2["k"])  {
				console.log("t6");
				if (isServer) {
					 o2["k"]++; return [o1, o2]; 
				} else {
					o1["k"]++; return [o1,o2];
				}
			}
		}
	}
	if (o1["o"] == "d") {
		if (o2["o"] == "i") {
			if (o1["k"] < o2["k"])  {console.log("t7"); o2["k"]--; return [o1, o2] }
			if (o1["k"] > o2["k"])  {console.log("t8"); o1["k"]++; return [o1, o2] }
			if (o1["k"] == o2["k"]) {console.log("t9"); o1["k"]++; return [o1, o2] }
		}
		if (o2["o"] = "d") {
			if (o1["k"] < o2["k"])  {console.log("t11"); o2["k"]--; return [o1, o2] }
			if (o1["k"] > o2["k"])  {console.log("t22"); o1["k"]--; return [o1, o2] }
			if (o1["k"] == o2["k"])  {console.log("t33"); return [{"o":"n"}, {"o":"n"}]}
		}
	}
	return [o1,o2]; //in case of other operations
}
