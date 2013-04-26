var yoloswag = require("./yoloswag"),
    q = require('q'),
    assert = require("assert");

// http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function addTwoNumbersAsync(a,b) {
    return q.delay(100).then(function () {
        return a + b;
    });
}

function ensureSumIsOddAsync(a, b) {
    return q.delay(100).then(function () {
        if ((a + b) % 2 === 0) throw new Error("I can't believe the sum of these numbers is even...");

        return true;
    });
}

var addTwoNumbersYolo = yoloswag(addTwoNumbersAsync),
    ensureSumIsOddYolo = yoloswag(ensureSumIsOddAsync);

describe("yoloswag", function () {

    it('should be a function', function () {
        assert(isFunction(yoloswag));
    });

    it('should return a function', function () {
        var addTwoNumbersYolo = yoloswag(addTwoNumbersAsync);
        assert(isFunction(addTwoNumbersYolo));
    });

    it('should return a promise when correct number of arguments', function () {
        var p = addTwoNumbersYolo(3, 5);
        assert(p && p.then);
    });

    it('should return the correct value', function (done) {
        addTwoNumbersYolo(3, 5).then(function (value) {
            if (value === 8) done();
            else done("nope");
        });
    });

    it('should work as callback, too', function (done) {
        addTwoNumbersYolo(3, 5, done);
    });

    it('should fail for having too few args', function () {
        assert.throws(function () {
            addTwoNumbersYolo(3);
        });
    });

    it('should fail for having three args, but the last one is not a function', function () {
        assert.throws(function () {
            addTwoNumbersYolo(3, 5, 6);
        });
    });

    it('should fail for trying to call .then after providing node callback', function () {
        assert.throws(function () {
            addTwoNumbersYolo(3, 5, function (err, result) {

            }).then(function (result) {

            });
        });
    });

    it('should work with errors for promise', function (done) {
        ensureSumIsOddAsync(3, 5).then(undefined, function (reason) {
            done();
        });
    });

    it('should work with errors for callback', function (done) {
        ensureSumIsOddYolo(3, 5, function (err, result) {
            if (err) done();
        });
    });
});