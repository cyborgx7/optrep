function xforml(o1, o2) {
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
