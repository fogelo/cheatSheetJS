//§ функция конструктор, class, constructor, super, new

/*
function Person(name, age, weight) {
    this.name = name
    this.age = age
    this.weight = weight
    this.voice = function () {
        console.log("hello")
    }
}
*/


/*
class Person {
    constructor(name, age, weight) {
        this.name = name
        this.age = age
        this.weight = weight
        this.voice = function () {
            console.log("hello")
        }
    }

}

class User extends Person {
    constructor(name, age, weight, id) {
        super(name, age, weight);
        this.id = id
    }
}

const anton = new Person("anton", 31, 75)
console.log(anton)
const ivan = new User("ivan", 20, 50, 1)
console.log(ivan)
*/


//§ статические методы и свойства

// * Статический метод - это метод, который присвоен самому классу, для создания такого метода используется ключевое слово static
// * статическией методы используются для функциональности и принадлежат классу в целом, а не конкретному объекту класса
// * технически статическое объявление это то же самое что и присвоение метода классу MyClass.myMethod = ...

/*class User {
    static staticMethod() {
        console.log(User === this)
    }
}

User.staticMethod()*/

// * фактически это то же самое что и:

class User {
}

User.staticMethod = function () {
    console.log(User === this)
}

User.staticMethod()

// * использование статического метода на примере

/*
// * пример №1
class Article {
    constructor(title, date) {
        this.title = title
        this.date = date
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date
    }
}

const articles = [
    new Article("html", "2"),
    new Article("css", "1"),
    new Article("js", "3"),
]

console.log(articles)
articles.sort(Article.compare)
console.log(articles)
*/

// * пример №2
class Article {
    constructor(title, date) {
        this.title = title
        this.date = date
    }

    static createTodays() {
        return new this("сегодняшний дайджест", new Date)
    }
}

console.log(Article.createTodays())


//§ instance of

// * instance of - проверяет принадлежность объекта к классу
const article = new Article("new title", "06.05.2022")
console.log(article instanceof Article)
console.log(article instanceof Array)

//§ try, catch, finally
// * это синтаксическая конструкция, которая позволяет ловить ошибки и вместо падения делать что-то осмысленное
/*
* 1) сначала выполняется код внутри блока try, и если все норм блок catch игнорируется, но если возникнет ошибка
* управление перейдет к блоку catch. Finally выполняется всегда
*
*
* */


// function example(){
//     try {
//
//         alert('Начало блока try');  // (1) <--
//
//         lalala; // ошибка, переменная не определена!
//
//         alert('Конец блока try (никогда не выполнится)');  // (2)
//
//     } catch(err) {
//
//         alert(`Возникла ошибка!`); // (3) <--
//
//     }
// }
//
// example

let a = 7
console.log(a);

let b = new Promise(function (resolve, reject) {
    //наш асинхронный код, то что нам нужно дождаться
    setTimeout(() => {
        a = 10
        //resolve это функция, которая будет выполнена когда код завершиться удачно, в resolve нужно прокинуть то что нужно для дальнейшего выполненич кода в методе then
        resolve(a)
    }, 1000)
}).then()

//then будет выполнен только тогда когда выполниться промис
b.then(function(){
    console.log(a)
})