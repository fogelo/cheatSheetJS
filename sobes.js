//§ Собес №1
/*
//@№1
//Что я вынес из этого примера? 
//1. если менять переменную в консольлоге, она изменится
//2. инкремент - это оператор, а не сокращенная запись. Инкремент применяется к операнду(унарный оператор)
//3. counter+=5 как можно запомнить эту конструкцию переприсваивания. Берем counter прибавляем что-то(+) и переприсваиваем(=)
let number = 0;
console.log(number++);
console.log(++number);
console.log(number); 
*/

/* 
//№2
var a = {}
if (a === {}) {
    var a = 123
}
console.log(a) 
 */


/*
 //@№3
 //1. узнал как быстро создать массив чисел от 0 до 9
 //2. узнал как можно быстро получать массивы ключей из значение из массивов (Object.keys(obj))
[0,1,2,3,4,5,6,7,8,9]
const arr = new Array(10).fill(0).map((item, index)=>index)
const arr = [...Array(10).keys()]
console.log(arr);  
*/


/* 
 //№4
const red = [[0, 1], [2, 3]].reduce(
    (acc, cur) => {
        return acc.concat(cur);
    },
    [1, 2]
);
console.log(red); 
*/



/*  
//@№5
//1. узнал, что у стрелочных функций нет this. Она не может обратиться к this, чтобы взять у него какие нибудь свойства.
//Стреловчные фунцкии используют используют значение this окружающего контекста
//2. понял как можно привязывать контекст к функции
let shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    diameter2: function(){
        return this.radius * 2;
    },
    perimeter: () =>  2 * Math.PI * this.radius
};

console.log(shape.diameter());  //20
console.log(shape.diameter2()); //20
// console.log(shape.perimeter()); //будет ошибка

//сall
const f1 = shape.diameter
console.log(f1.call(shape))     //20
//apply
const f2 = shape.diameter
console.log(f2.apply(shape))    //20
//bind
const f3 = shape.diameter.bind(shape)
console.log(f3())               //20
 */





/* 
//@№5.1 дополнительно к тому как работает this в замыканиях

const test = {
    name: 'anton',
    createAnonFunction: function () {
        return function () {
            console.log(this.name);
            console.log(arguments);
        };
    },

    createArrowFunction: function () {
        return () => {
            console.log(this.name);
            console.log(arguments);
        };
    }
};

const anon = test.createAnonFunction('hello', 'world');
// anon() //будет ошибка, почему?
const arrow = test.createArrowFunction('hello', 'world');
// arrow() //не будет ошибки,  почему? 
*/


/* 
//@№5.2 дополнительно к тому как работает this в колбэках
let user = {
    firstName: "Вася",
    sayHi() {
        console.log(`Привет, ${this.firstName}!`);

    }
}
// вот так контекст потеряется
setTimeout(user.sayHi, 1000); // Привет, undefined!

// а так не потеряется (метод bind)
setTimeout(user.sayHi.bind(user), 1000); // Привет, Вася!

 // и так не потеряется (анонимная стрелочная функция)
setTimeout(()=>user.sayHi(), 1000); // Привет, Вася!

  */


//@№6 узнал, что пока while(любое число кроме 0) будет срабатывать цикл так как возвращает true

//// что выведет и почему?
//1. понял на этом примере, что цикл выполняется просто когда условие внутри него возвращает true (тип данных внутри скобок преобразуетс в булевый)
//2. вернет девять нулей так как каждый цикл будет добавлять в стек анонимную функцию, но начнут они выполнятся только после того как все добавятся.
//   Соответственно когда они начнут выполнятся i для всех будет одинакова.
//3. Понял, что в стек попадают не только функции, а замыкания (комбинация функция+лексическое окружение)
//4. понял как работает event loop. Все синхронные функции попадают в call stack и сразу вызываются. setTimout же попадает в call stack и вызывается,
//   анонимная функция внутри него попадет(регистрируется) в web api браузера там готовится(ждет) и как будет готова попадает в очередь (callback queue) 
//   и только затем она попадает в стек (call stack)

/* let i = 10;
while (--i) {
    setTimeout(() => {
        console.log(i)
    }, 0)
} */


////Что выведет и почему?
//1. понял что такое стек (последний пришел первый ушел) и очередь (последний пришел последний ушел) 
//2. вернет по порядку числа от 9 до 0. Так как каждое замыкание попадет в очередь(event loop) со своим значением k
/* let j = 10
while (--j) {
    let k = j;
    setTimeout(() => {
        console.log(k)
    },)
}
 */

////Что выведет и почему?
/* let j=10
while (--j) {
    console.log(j)
}  */

/*
////что выведет и почему?
//переменная var i объявится, инициализируется внутри блока,  но перед выполнением поднимется за пределы блока, в результате когда будут отрабытвать
//функции они возьмут i из внешней области
for (var i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 0);
}
//переменная let i объявится, инициализируется внутри блока и перед выполнением поднимется до верха блока. Значит каждый раз когда будет выполнятся цикл замыкание будет попадать в очередь
//со своим значением i
for (let i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 0);
}
//если не задать let переменная объявится как var
for (i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 0);
}
 */

/* ////Что выведет и почему?
//выведутся числа от 0 до 9. видимо из за того что в setTimeout мы передаем просто инструкцию а не функцию и она сразу регистрируется 
//в web api со значением, например вот так console.log(2)
for (var i = 0; i < 10; i++) {
    setTimeout(console.log(i), 0);
}
for (let i = 0; i < 10; i++) {
    setTimeout(console.log(i), 0);
} */

////Что выведет и почему?
/* let i = 10;
while (--i) {
    setTimeout(() => {
        console.log(i)
    }, 0)
} */

/* 
////Что выведет и почему?
//1. создаем массив из замыканий
let functionArr = []
let j = 10
while (--j) {
    var k = j;
    functionArr.push(() => {
        console.log(k)
    })
}
functionArr[2]() 
*/


/* 
//@что выведет в консоли и почему
//@1. Показываем как внутренней функции остается доступ к переменным внешней даже после того как внешняя отработала (замыкание)
function getCounter() {
    let counter = 0
    return function () {
        return counter++
    }
}

let count = getCounter()
console.log(count())
console.log(count()) 
*/









// new Promise(res => res())
//     .then(() => {
//         throw new Error('Ошибка')
//         console.log(2)
//     })
//     .catch(err => {
//         console.log(1)
//         throw err
//     })
//     .then(() => console.log(3))
//     .catch(() => console.log(4))
//     .then(() => console.log(5))
//     .catch(() => console.log(6))



// const product = {
//     price: 3990,
//     options: [
//         {
//             id: 1,
//             title: '256ГБ',
//             price: 450,
//         },
//         {
//             id: 2,
//             title: '512ГБ',
//             price: 990,
//         }
//     ],
//     info: {
//         screen: {
//             size: {
//                 width: 1920,
//                 height: 1080
//             }
//         }
//     }
// }

// const {info: {screen: {size: {width,main=145}}}} =product
// console.log(width,main)



// console.log(1)

// const p = new Promise((resolve, reject) => {
//     console.log(2)
//     resolve(3)
// })

// console.log(4)

// setTimeout(() => console.log(5), 0)

// console.log(6)

// for (let i = 0; i < 10; i++) {
//     p.then(res => {
//         console.log({i, res})
//         return {i, res}
//     })
// }

// console.log(7)



// 1 2 4 6 7 5 

/*

// 4565
// 1000, 500, 100, 50, 5
// { '5': 3, '50': 1, '100': 0, '500': 1, '1000': 4 }
// Math.floor(price / el)

const arr = [1000, 500, 100, 50, 5];
const price = 4565;

let arr2 = []
const bankomat = (price, arr) => {
  for(let i=0;i<arr.length;i++){
    let number = Math.floor(price/arr[i])
    price = price - number*arr[i]
    console.log(price)
  }
}


bankomat(price, arr)

console.log(bankomat(price, arr));
 */




