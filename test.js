emit = require("emit")

// emit method APIs are identical to their native counterparts...
Math.pow(2, 2)       // 4
emit.Math.pow(2, 2)  // 4
 
Array(1, 2, 3)       // [1, 2, 3]
emit.Array(1, 2, 3)  // [1, 2, 3]
 
1 / 2                // .5
emit.ops["/"](1, 2)  // .5

// with one exception: emit methods can also take functions, which are
// treated as yet-unevaluated values that can be "watched". All emit
// methods compose these (possibly unevaluated) values into a single
// value; if any of these values are functions, the returned value will
// also be a function.

// Here's an example of such a function; it reports an incremented number
// back to its listener every second.
function count(cb) {
  var send = function(){ cb(null, i++) }
  	, i = 0

  send()
  setInterval(send, 1000)
}

// Since the value reported by count changes every second, so does
// the value of any method that uses it. So these are all functions:
emit.Math.pow(2, count)  // [Function]
emit.Array(1, 2, count)  // [Function]
emit.ops["/"](1, count)  // [Function]

// We can observe these changing values through the console.
function log(e, data){ console.log(e || data) }

emit.Math.pow(2, count)(log)  // 1, 2, 4, 8, 16, 32...
emit.Array(1, 2, count)(log)  // [1, 2, 0], [1, 2, 1], [1, 2, 2]...
emit.ops["/"](1, count)(log)  // Infinity, 1, .5, .25...

// Now we can now start to compose these into increasingly
// complex values.
random   = emit.Math.random(count)
randBin  = emit.Math.round(random)
coinToss = emit.ops["?:"](randBin, "heads", "tails")
message  = emit.ops["+"]("The coin landed on ", coinToss)

message(log)  // "The coin landed on heads"
              // "The coin landed on tails"
              // "The coin landed on heads"
              // ...