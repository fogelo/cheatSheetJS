/*
? fetch - это обертка над промисом
*
* запись: let promise = fetch('https://jsonplaceholder.typicode.com/todos/1')
* представляет собой запись:
*        let promise = new Promise(function(resolve, reject) {
*           //что то происходит в функции, как-то делается запрос и в результате вызовется
*           resolve(result) или reject(error)
* });
*
* затем мы мы можем 'подцепиться' к промису и сказать ему что-то сделать после того как он зарезолвится или заретжектится:
//?.then(f1,f2) - f1 отработает если промис зарезолвится, f2 если заретжектится
//?.catch(f) - тоже самое что и then(null, f)
//?.finally(f) - f отработает в любом независимо от того зарезолвится промис или заретжектится, в него не передается res

*promise.then(function(result){
    console.log(result)
})
 */

//? §Async await

/*
* async перед функцией значит, что эта функция возвращает промис (то есть результ который она возвращает будет находится внутри объекта промис)
* await заставляет интепретатор ждать пока промис зарезолвиться или заретжектится
*
* */
/*async function f1() {
    return 1
}*/

// async function getSomething(){
//     let promise1 = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//     console.log(promise1)
// }
// getSomething()


/*
let strJSON = ''

let promise2 = fetch('https://jsonplaceholder.typicode.com/todos/1')

promise2.then(function(response){
    // console.log(response.json())
    strJSON = '111'
    console.log(strJSON)

})

console.log(strJSON)



*/


// sobes 2
// Есть эндпойнт GET /api/users, по которому можно получить список пользователей.

/*    [
    {
        id: "1",
        username: "ivanov"
    }
    ]

function UserList() {
}

const UsersList = () => {

    let [users, setUsers] = useState([])


    useEffect(() => {
        fetch('/api/users/').then(response => {
            setUsers(response)
        });
    }, [])

    return (
        <div>
            {users.map(item)=>{
                return <div key={item.id}>{item.username}</div)
                }}
                </div>
                )
            }



                let obj = {
                name: 'js',
                f1: function(){
                console.log(this.name)

            },
                f2:()=>{
                console.log(this.name)
            },
            }

                obj.f1()
*/


//§ __proto__ и prototype

/*
* и __proto__ и prototype это свойства объекта
* Надо выяснить у каких объектов есть __proto__ а у каких prototype и как они между собой связаны
* Ссылочная связь между __proto__ и prototype, хранение объектов по ссылкам (может быть один объект в памяти и несколько ссылок на него)
* объекты равны только если это один и тот же объект

* какие-то объекты имеют свойство __proto__ и это __proto__ равно каким-то свойствам prototype других объектов

* __proto__ и prototype это объекты, __proto__ ссылается на тот же объект, что и prototype

* __proto__ есть у всех объектов

* если мы к примитиву обращаемся как к объекту (ставим точку) то в памяти временно создается объекта версия этого примитива
let man = {}            // man.__proto__
let users = []          // users.__proto__
let age = 18            // age.__proto__
let youtube = 'anton'   // youtube.__proto__
function aaa(){}        // aaa.__proto__
let bbb = function(){}  // bbb.__proto__
let ссс =()=> {}        // ccc.__proto__
class ddd {}            // ddd.__proto__
let bool = true         // bool.__proto__
* когда мы создаем функцию у нас появляется переменная которая ссылается на объект и объект на который эта переменная ссылается
* class это тоже функция просто немного навороченная (синтаксических сахар)

* Что же такое __proto__? Почти всегда это объект. __proto__ вообще равно какому то prototype, а prototype почти всегда это объект

* разные __proto__ разных по типу объектов - совершенно независимые разные объекты.
* У одинаковых по типу объектов - они равные, то есть это один и тот же объект

*/

let man1 = {}
let man2 = {}

// так как и man1 и man2 создаются одинаково при помощи литерал объекта их __proto__ будут равны между собой, то есть их свойство __proto__
// будет ссылаться на один и тот же объект
console.log(man1.__proto__ === man2.__proto__) // true

let users = []
let cars = []
console.log(users.__proto__ === cars.__proto__) // true

let age = []
let level = []
console.log(age.__proto__ === level.__proto__) // true

let youtube = 'youtube'
let website = 'website'
console.log(youtube.__proto__ === website.__proto__) // true

// __proto__ функций созданных по разному тоже будут равны, а значит __proto__ это будет ссылка на один и тот же объект
function foo1() {
}

let foo2 = function () {
}
let foo3 = () => {
}

class Foo4 {
}

console.log(foo1.__proto__ === foo2.__proto__ && foo3.__proto__ === Foo4.__proto__) // true

// а вот эти __proto__ уже не равны, значит эти __proto__ ссылаются на разные объекты
console.log(youtube.__proto__ === foo1.__proto__) // true

//? что значит разные по типу объекты? Любой объект в js создается с помощью класса или функции конструктора
//? даже если мы этого не видим явно. Чтобы создать объект нужно написать new и названия какого то класса
//? Promise, Object - это функции конструкторы(классы), принято их писать с большой буквы
let promise = new Promise(() => {
})  // new Promise (...)
let man = {}                                // new Object(...)  - за кадром
let users2 = []                              // new Array(...)

// когда мы создаем примитив не создается объект new Number, но он временно создается
// когда мы обращаемся к примитиву как к объекту (через точку)
let age3 = 18                                // new Number(...)
let youtube3 = 'youtube'                     // new String(...)
let bool3 = true                             // new Boolean(...)

function foo5() {
}                          // new Function(... )
let foo6 = function () {
}                   // new Function(...)
let foo7 = () => {
}                         // new Function(...)
class Foo8 {
}                               // new Function(...)

let foo9 = new Foo8()                       // new Foo8(...)


// чтобы понимать, что это за __proto__, нужно точно знать с помощью какой функции-конструктора(класса) создан данный объект
//__proto__ равны если что-то создали при помощи одной и той же функции конструктора или класса (new что-либо)
//__proto__ объекта не равно функции конструктору или классу с помощью, которого он создался, но чтобы понять чему он равен
//нужно понимать с помощью чего он создан

//?стрелочная функция не может быть функцией конструктором
//? Мы конструировать объекты можем только с помощью class либо function
class Samurai {
}

function Component() {
}

const API = function () {
}

// у любого объекта есть свойство __proto__ и у объекта, который одновременно является либо классом либо функцией есть свойство prototype
//? Для чего нам нужно знать с помощью какого класса был создан объект? Для того чтобы  __proto__ нашего объекта мог связаться с
//? prototype того класса с помощью которого был создан


//? prototype - это независимый объект (это значит, что они никогда не равны, разные объекты), сам по себе, с определенным набором свойств и методов.
console.log(Samurai.prototype)
console.log(Component.prototype)
console.log(API.prototype)

console.log(Object.prototype)
console.log(Array.prototype)
console.log(Function.prototype)
console.log(Boolean.prototype)
console.log(Number.prototype)
console.log(String.prototype)
console.log(Promise.prototype)

//? __proto__ любого объекта ссылается на prototype класса(функции-конструктора), с помощью которого было создан


//? Зачем классу нужен объект prototype и зачем объектам, созданным с помощью этого класса свойство __proto__,
//? которое ссылается на этот объект pro totype? Классы нужны чтобы клепать однотипные объекты.
//? Если мы пытаемся прочитать свойство объекта, либо вызвать его метод, а данного совйства/метода нет, то объект
//? полезет искать его через ссылку __proto__ в prototype-е класса, с помощью которого он был создан


/*
let dimych = {name: 'dimych'}

dimych.toString() - этого метода нет поэтому dimych.__proto__    => Object.prototype = { toString(){}}
*/









//?Мы должны когда определяем функцию конструктор все методы цеплять к прототипу (старый синтаксис)
function Samurai(name) {
    this.name = name;
}

Samurai.prototype.hello = function () {
    alert(this.name)
}

let shogun = new Samurai('anton')
shogun.hello() //shogun.__proto__    => Samurai.prototype, и там находит hello и вызывает его как свой, то есть this будет равен shogun

//?современный синтаксис с помощью классов, но под капотом все тоже что и в старом

class Samurai{
    constructor(name) {
        this.name = name
    }
    hello(){
        alert(this.name)
    }
}











//1
console.log(({}).prototype === ({}).__proto__)

//2
function ITKamasutra() {
}

console.log(ITKamasutra.prototype === ITKamasutra.__proto__)

//3
function ITKamasutra() {
}

function ITIncubator() {
}

console.log(ITIncubator.__proto__ === ITKamasutra.__proto__)
console.log(ITIncubator.prototype === ITKamasutra.prototype)

//5

// let age = 18
console.log(age.prototype === Number.prototype)
console.log(age.__proto__ === Number.__proto__)

//6
class Hacker {
}

console.log(Hacker.__proto__ === Function.prototype)

//7
function ITIncubator() {
}

// console.log(ITIncubator.__proto__ === ???)

//8
const count = 12
// console.log(count.__proto__ === ???)






















