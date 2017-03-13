var arr = [[1,2], [3,4,5], [6]];
var result = arr.reduce(function(arr, val) {
	return arr.concat(val);
});
