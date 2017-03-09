for (var i = 0; i < 10; i++) {
    var a = -1;
    setTimeout(function(){
        ++a;
        console.log(a);
    }, 1000);
}


for (var i = 0; i < 10; i++){
    setTimeout((function(i){
        console.log(i);
    })(i), 1000)
}
