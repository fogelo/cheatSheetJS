var arr1 = ["1", "2"];
var arr3 = ["1", "2"];
var arr2 = ["1", 2];
var arr4 = ["1", "2"];
var arr5 = ["1", "2"];
var tuple3 = ["qwe", false, 0];
var tuples = [
    ["sf", "asdf", 0],
    ["sf", "asdf", 1],
    ["sf", "asdf", 2],
];
var obj = {
    a: 1,
    b: 2,
    print1: function () {
        return 1;
    }
};
function pickCard(x) {
    if (typeof x === "number") {
        return x;
    }
    if (typeof x === "string") {
        return x;
    }
}
var valueFactory = function (x) { return x; };
var myValue = valueFactory(11);
var x1 = { value: "123" };
var ArrayOfNumbers = (function () {
    function ArrayOfNumbers(collection) {
        this.collection = collection;
    }
    ArrayOfNumbers.prototype.get = function (index) {
        return this.collection[index];
    };
    return ArrayOfNumbers;
}());
var ArrayOfStrings = (function () {
    function ArrayOfStrings(collection) {
        this.collection = collection;
    }
    ArrayOfStrings.prototype.get = function (index) {
        return this.collection[index];
    };
    return ArrayOfStrings;
}());
var ArraOfAnything = (function () {
    function ArraOfAnything(collection) {
        this.collection = collection;
    }
    ArraOfAnything.prototype.get = function (index) {
        return this.collection[index];
    };
    return ArraOfAnything;
}());
new ArrayOfNumbers([1, 2, 3]);
new ArrayOfStrings(["sf", "af"]);
new ArraOfAnything([1, 2, 3]);
new ArraOfAnything(["af", "asf", "hfdg"]);
function printNumber(a) {
    console.log(a);
}
function printString(a) {
    console.log(a);
}
function printAnything(a) {
    console.log(a);
}
printAnything("asf");
//# sourceMappingURL=nepom.js.map