var a = [1, 3, 5, 7, 9];
var b = [1, 2, 3, 4];
var c = [];
for (var i = 0; i < a.length; i++) {
	if(b.includes(a[i])) {
		c.push(a[i]);
	}
}

var a = [1, 3, 5, 7, 9];
var b = [1, 2, 3, 4];
var c = [];
var d = [];
for (var i = 0; i < a.length; i++) {
	c[a[i]] = true;
}
for (i = 0; i < b.length; i++) {
	if (c[b[i]x]) {
		d.push(b[i]);
	}
}
