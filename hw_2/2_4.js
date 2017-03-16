function bind(func, context) {
  return function() {
    return func.apply(context, [arg1, arg2]);
  };
}

function bind(func, context) {
  return function() {
    return func.call(context, arg1, arg2);
  };
}
