var original = [].constructor
  , originalProto = original.prototype
  , arrayProto = Array.prototype
  , slice = originalProto.slice
  , methods
  , apply
  , i

function Array() {
  var args = arguments
    , length = args.length
    , i = length

  while (i--) if (typeof args[i] == "function") break

  return i < 0 ? slice.call(args) :

  function(emit) {
    var evaluated = []
      , remaining = length
      , i = 0

    while (i < length) !function(i) {
      !function set(err, data) {
        if (!err) {
          if (typeof data == "function") return data(set)
          if (remaining && !(i in evaluated)) remaining--
          evaluated[i] = data
        }

        if (!remaining || err) return emit(err, evaluated.slice(0))
      }(null, args[i])
    }(i++)
  }
}

module.exports = Array

apply = require("./Function").prototype.apply

methods = ["concat", "indexOf", "join", "toString", "splice", "shift", "unshift", "lastIndexOf", "reverse", "pop", "push", "slice"]
i = methods.length

while (i--) !function(name) {
  arrayProto[name] = function() {
    return apply.call(
      originalProto[name],
      apply.call(Array, null, this),
      Array.apply(null, arguments)
    )
  }
}(methods[i])

methods = ["map", "sort", "filter", "some", "reduceRight", "forEach", "reduce", "every"]
i = methods.length

while (i--) !function(name) {
  arrayProto[name] = function() {
    var args = arguments

    return apply.call(
      function(){ return originalProto[name].apply(this, args) },
      apply.call(Array, null, this)
    )
  }
}(methods[i])