var rslt = 0;
function sum() {
	if (arguments[0] == undefined) {
		var tmp = rslt;
		rslt = 0;
        return tmp;
    }
    rslt = rslt + arguments[0];
    return this.sum;
}
