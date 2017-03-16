function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

function bind(func, context) {
  return function() {
    return func.call(context, arguments);
  };
}
