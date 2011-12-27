var Array = require("./Array")
  , concat = [].concat
  , proto = Function.prototype
  , call
  , apply

function Function() {
  return apply.call(Function.constructor, null, arguments)
}

call = proto.call = function call() {
  var args = Array.apply(null, arguments)
    , fn = this

  return typeof args != "function" ?

  fn.call.apply(fn, args) :

  function(emit) {
    args(function(err, data) {
      if (!err) data = fn.call.apply(fn, data)
      return emit(err, data)
    })
  }
}

apply = proto.apply = function(context, args) {
  var fn = this

  return typeof args != "function" ?
  
  call.apply(fn, concat.apply([context], args)) :

  function(emit) {
    args(function(err, data) {
      if (!err) data = apply.call(fn, context, data)
      return emit(err, data)
    })
  }
}

module.exports = Function