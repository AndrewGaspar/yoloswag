yoloswag
========

Don't compromise: your module can do both node style callbacks and Q style promises.

To install, run:

```
npm install yoloswag
```

A couple preliminary notes:
* This module currently only works in CommonJS environments.
* Functions that are yoloswag'd can only work with a fixed number of arguments
  * Any call to a yoloswagged function with up to the max number of arguments returns a promise.
  * With 1 over the max number of arguments, the final argument must be a node style callback. The function call will return no value.

These restrictions may be changed later if this is a module people actually want.

## Design with Promises, Freedom for the Client

Yoloswag allows you to transform your promise returning functions into node-style callbacks easily, while still allowing those client programmers who do use promises to use your library as a promise returning library.

Consider the following:
```js
function getTPSReport(id) {
  return q($.getJSON("/reports/" + id)); // q is to fix jQuery's non-complient promises
}
```

Normally this would return a promise. However, not all node developers wish to use Promises and prefer the comfort of node style callbacks, where the first argument is the error and the second argument is the result. Normally you'd have to choose... why not both? Let's yoloswag our API!

```js
var getTPSReportYolo = yoloswag(getTPSReport);

// Using a callback works
getTPSReportYolo(3, function(err, result) {
  if(result.overdue) yellAt(result.author);
}); // returns undefined

// but you can also get a promise
getTPSReportYolo(3).then(function(result) {
  if(result.overdue) yellAt(result.author);
}); // returns a promise
```

See the tests for other examples.
