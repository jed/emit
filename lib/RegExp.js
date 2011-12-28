var apply = require("./Function").prototype.apply
  , original = /./.constructor
  , methods = ["exec", "toString", "test"]
  , i = methods.length

function RegExp() {
  return apply.call(original, null, arguments)  
}

while (i--) !function(name) {
  RegExp.prototype[name] = function() {
    var method = original[name]

    exports[name] = function() {
      return apply.call(method, this, Array.apply(null, arguments))
    }
  }
}(methods[i])

module.exports = RegExp