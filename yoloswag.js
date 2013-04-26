var q = require('q');

function arguments_slice(args, start, end) {
    return Array.prototype.slice.call(args, start, end);
}

// http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function yoloswag(func, numArgs) {
    /// <summary>Wraps a promise returning function in a node-style async function with a callback. The twist is the function returns a promise if a node callback isn't provided. 
    /// Doesnt't currently support function arity. The function must have a certain set of arguments and be called with that number of arguments.</summary>
    /// <param name="func">A promise returning function.</param>
    /// <param name="numArgs" optional="true">An optional argument specifying the number of arguments the function takes. If not provided or null, numArgs will be set to func.length</param>

    if (numArgs === undefined || numArgs === null) {
        numArgs = func.length;
    }

    function kush420() {
        var args = arguments_slice(arguments); // gets array of arguments

        if (args.length === numArgs) {
            return q(func.apply(null, args)); // call the function with the arguments provided, wrap the return in a q promise just in case, and return it.
        }
        else if (args.length === numArgs + 1 && isFunction(args[args.length - 1])) {
            var promise = q(func.apply(null, args.slice(0, args.length - 1))); // call function with all provided args and wrap as a promise
            var cb = args[args.length - 1];

            promise.then(function (value) {
                cb(null, value);
            }, function(reason) {
                cb(reason);
            });
        } else {
            throw new Error(numArgs + " args must be supplied for this function plus an optional callback function.");
        }
    }

    return kush420;
}

module.exports = yoloswag;