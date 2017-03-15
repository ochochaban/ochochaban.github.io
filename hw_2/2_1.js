function DecToBin(x) {
	if (x > 1) {
		return DecToBin(Math.floor(x / 2)) + x % 2
	}
	return "" + x;
}
