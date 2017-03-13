function DecToBin(x) {
	if (x > 1) {
		var rest = x % 2;
		return "" + DecToBin(Math.floor(x / 2)) + rest;
	}
	return "" + x;
}
