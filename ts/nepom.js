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
function aaa() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    console.log(rest[0]);
    console.log(rest[1]);
}
aaa(1, 2);
//# sourceMappingURL=nepom.js.map