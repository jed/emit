var Array = require("./Array")
  , ArrayCtor = [].constructor
  , FunctionCtor = ArrayCtor.constructor
  , concat = ArrayCtor.prototype.concat
  , proto = Function.prototype
  , call
  , apply
  , _new

function Function() {
  return apply.call(FunctionCtor, null, arguments)
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

_new = proto["new"] = function() {
  var self = this
    , args = Array.apply(null, arguments)

  function getFn(arity) {
    return _new[arity] || (_new[arity] = Function(
      "Ctor, args, i",
      "return new Ctor(" +
        ArrayCtor(arity + 1).join(",args[i++]").slice(1) +
      ")"
    ))
  }

  return typeof args != "function" ?

  getFn(args.length)(self, args, 0) :

  function(emit) {
    args(function(err, data) {
      if (!err) data = getFn(data.length)(self, data, 0)
      return emit(err, data)
    })
  }
}

module.exports = Function