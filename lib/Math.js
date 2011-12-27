var apply = require("./Function").prototype.apply
  , methods, i

methods = ["LN10", "PI", "E", "LOG10E", "SQRT2", "LOG2E", "SQRT1_2", "LN2"]
i = methods.length

while (i--) exports[methods[i]] = Math[methods[i]]

methods = ["cos", "pow", "log", "tan", "sqrt", "ceil", "asin", "abs", "max", "exp", "atan2", "random", "round", "floor", "acos", "atan", "min", "sin"]
i = methods.length

while (i--) !function(name) {
  var method = Math[name]
  exports[name] = function(){ return apply.call(method, null, arguments) }
}(methods[i])