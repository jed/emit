(  ( (emit) )  )
================

(emit) is a [functional reactive programming][frp] toolkit based on JavaScript primitives, allowing you to compose functional applications using the APIs you already know.

(emit) is a very rough work in progress. It can run both in the browser and on [node.js][node].

Example
-------

```javascript
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
random   = emit.Math.random(ping)
randBin  = emit.Math.round(random)
coinToss = emit.ops["?:"](randBin, "heads", "tails")
message  = emit.ops["+"]("The coin landed on ", coinToss)

message(log)  // "The coin landed on heads"
              // "The coin landed on tails"
              // "The coin landed on heads"
              // ...
```

Installation
------------

To install, head to your terminal and enter:

    npm install emit

Support
-------

### Current

- `Array`: all ES3/ES5 methods
- `Function`: `apply`, and `call`
- `Math`: all statics and function
- operators: most accessors, including `!`, `~`, `typeof`, `void`, `*`, `/`, `%`, `+`, `-`, `<<`, `>>`, `>>>`, `<`, `<=`, `>`, `>=`, `==`, `!=`, `===`, `!==`, `&`, `^`, `|`, `&&`, `||`, `, `, `?:`, `[]`, and `in`

### Planned

- RegExp, String, Date, Number, Boolean
- Function::bind
- DOM/HTML
- DOM events
- JSON
- node.js file system, etc.

License
-------

Copyright (c) 2012 Jed Schmidt, http://jed.is/
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[frp]: http://en.wikipedia.org/wiki/Functional_reactive_programming
[node]: http://nodejs.org/
[flapjax]: http://www.flapjax-lang.org/
[tangle]: http://worrydream.com/Tangle/
[spreadsheet]: http://en.wikipedia.org/wiki/Spreadsheet