var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Developer_isLife;
var id1 = "fs";
var id2 = "af";
var ID3 = "asf";
function f1(p1, p2) {
    return p1 + p2;
}
function f2() {
    return "";
}
(function () { });
function f4(p1, p2) {
    if (typeof p2 === "string") {
        return p2;
    }
    else {
        return p1;
    }
}
f4(1, "12");
var A1 = (function () {
    function A1() {
    }
    return A1;
}());
var B1 = (function () {
    function B1() {
    }
    return B1;
}());
var C1 = (function () {
    function C1() {
    }
    return C1;
}());
var v1 = { a: 1, b: "123", c: false };
var v2 = { a: 1, b: "123", c: false, d: 2 };
function f5() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
var C2 = (function () {
    function C2() {
    }
    C2.prototype.method = function () {
    };
    return C2;
}());
function f6() {
}
var Dog = (function () {
    function Dog() {
    }
    Object.defineProperty(Dog.prototype, "id", {
        get: function () {
            return "123";
        },
        enumerable: false,
        configurable: true
    });
    Dog.prototype.execute = function (command) { };
    return Dog;
}());
var Bird = (function () {
    function Bird() {
    }
    Object.defineProperty(Bird.prototype, "id", {
        get: function () {
            return "123";
        },
        enumerable: false,
        configurable: true
    });
    Bird.prototype.execute = function (command) { };
    return Bird;
}());
var Eagle = (function (_super) {
    __extends(Eagle, _super);
    function Eagle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Eagle;
}(Bird));
var Car = (function () {
    function Car() {
    }
    return Car;
}());
var a = {
    validKeyDeclareStatic: "value",
    invalidKeyDeclareStatic: 0
};
a.validKeyDefineDynamicKey = "value";
a.invalidKeyDefineDynamicKey = 0;
a[0] = "value";
var BirdEntity = (function () {
    function BirdEntity(name, age, isAlive) {
        this.name = name;
        this.age = age;
        this.isAlive = isAlive;
    }
    return BirdEntity;
}());
var FishEntity = (function () {
    function FishEntity(name, age, isAlive) {
        this.name = name;
        this.age = age;
        this.isAlive = isAlive;
    }
    return FishEntity;
}());
var Developer = (function () {
    function Developer() {
        _Developer_isLife.set(this, true);
    }
    Object.defineProperty(Developer.prototype, "isLife", {
        get: function () {
            return __classPrivateFieldGet(this, _Developer_isLife, "f");
        },
        enumerable: false,
        configurable: true
    });
    return Developer;
}());
_Developer_isLife = new WeakMap();
var Animal = (function () {
    function Animal() {
        this.name = "name";
    }
    return Animal;
}());
var date1 = { id: 1, date: "march" };
var date2 = {};
var date3 = { id: "123", date: 123 };
var e1 = document.querySelector("#div1");
console.log(e1);
//# sourceMappingURL=doc.js.map