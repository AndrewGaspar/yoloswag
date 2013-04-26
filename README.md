yoloswag
========

Don't compromise: your module can do both node style callbacks and Q style promises.

To install, run:

```
npm install yoloswag
```

A couple preliminary notes:
* This library currently only works in CommonJS environments.
* Functions that are yoloswag'd must have a fixed number of arguments.

These restrictions may be changed later if this is a module people actually want.

## Design with Promises

Yoloswag allows you to transform your promise returning functions into node-style callbacks easily, while still allowing those client programmers who do use promises to use your library as a promise returning library.

Consider the following:
```
function getTPSReport(id) {
  return q($.getJSON("/reports/" + id)); // q is to fix jQuery's non-complient promises
}
```

Normally this would return a promise. However, not all node developers wish to use Promises and prefer the comfort of node style callbacks, where the first argument is the error and the second argument is the result. Let's yoloswag our API!

```
var getTPSReportYolo = yoloswag(getTPSReport);

getTPSReportYolo(3, function(err, result) {
  if(result.overdue) {
    yellAt(result.author);
  }
});
```

See the tests for other examples.
