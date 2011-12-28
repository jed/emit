var apply = require("./Function").prototype.apply
  , operators = ["!0", "~0", "typeof 0", "void 0", "0*1", "0/1", "0%1", "0+1", "0-1", "0<<1", "0>>1", "0>>>1", "0<1", "0<=1", "0>1", "0>=1", "0==1", "0!=1", "0===1", "0!==1", "0&1", "0^1", "0|1", "0&&1", "0||1", "0,1", "0?1:2", "0[1]", "0 in 1"]
  , i = operators.length

while (i--) !function(str) {
  var body = str.replace(/\d/g, "arguments[$&]")
    , name = str.replace(/\d| /g, "")
    , fn = Function("return " + body)

  exports[name] = function(){ return apply.call(fn, null, arguments) }
}(operators[i])