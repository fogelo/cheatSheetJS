//§ Добавление и удаление элементов
//§ Поиск
//§ Преобразование

//§     for - для перебора элементов массива // items

/* let arr = ['Брайт', 'Нюша', 'Герда']

for (i = 0; i < arr.length; i++) {
    console.log(arr[i])
}*/

// //§     forEach (fn)

/* let arr = ["Брайт", "Хеп", "Нюша", "Тимка"];

arr.forEach(function(item, index, arr) {
    console.log(item, index, arr)
});
 */

//§     for...of - для перебора элементов массива

/*let arr = ['Брайт', 'Нюша', 'Герда']

// проходит по значениям
for (let item of arr) {
console.log(item)
}*/

/*//@values для работы со значениями значений (хотя он тут избыточен)
const a = ['a', 'b', 'c'];
console.log(a.values())
console.log([...a.values()])
for (const index of a.values())
console.log(index);*/

/*//@keys для работы с ключами объекта
const a = ['a', 'b', 'c'];
console.log(a.keys())
console.log([...a.keys()])
for (const index of a.keys())
console.log(index)*/


/*//@entries для одновременной работы с ключами и их значениями
const a = ['a', 'b', 'c'];
console.log(a.entries())
console.log([...a.entries()])
for (const [index, item] of a.entries()) //деструктурирующее присваивание
console.log(index, item)*/

//§     reduce/reduceRight(func, initalValue) - для прохода по массиву с вычислением значения (например суммы элементов)

/*
let arr = [1, 2, 3, 4, 5]
let result = arr.reduce(function (previousValue, currentItem, index, arr) {
    return previousValue + currentItem;
}, 0);

console.log(result) // 15
 */

//§     every(fn)/some(fn) - используются для проверки массива  // true, false

/*
let arr = [-1, 0, -1, -2, 3]

let isSomePositive = arr.some((item) => {
    return item > 0
})
console.log('в массиве есть хотябы одно положительное число ? ', isSomePositive) 

let isEveryPositive = arr.every((item) => {
    return item > 0
})
console.log('в массиве все числа положительные? ', isEveryPositive)
 */

//§    map(fn) - используются для создания нового массива на базе старого //array

/* 
let arr = ['html', 'css', 'javascript']

let mapArr = arr.map((item, index, arr) => {
    return item.length
})
console.log(mapArr)
 */

//§    filter(fn) - используются для создания нового массива на базе старого, в новый войдут только те элементы для которых вызов функции вернет true

/* 
let arr = [-2, -1, 0, 1, 2]

let positiveArr = arr.filter((item, index, arr) => {
    return item > 0
})

console.log(positiveArr)
 */

//§     pop - удаляет последний элемент в массиве и возвращает его //item
//§     push - добавляет элемент(ы) в конец массива // arr.push(smth) - вернет длину массива

/* 
let arr = ['Брайт', 'Нюша', 'Герда']

//Pop
let popElement = arr.pop()
console.log(popElement)
console.log(arr)

//Push
arr.push('Карим', 'Пальма')
console.log(arr)
 */

//§     shift - удаляет из массива первый элемент и возвращает его  // item
//§     unshift - добавляет элемент(ы) в начало массива // arr.unshift(smth) - вернет длину массива

/* 
let arr = ['Брайт', 'Нюша', 'Герда']

//shift
arr.shift()
console.log(arr)

//unshift
arr.unshift('Карим', 'Пальма')
console.log(arr)
 */


//§     splice(с какого?, сколько удалить?, вставляем) - швейцарский нож для работы с массивами. Умеет добавлять, удалять и заменять
//§Меняет исходный
/* 
let arr = ['html', 'css', 'javascript']

//splice возвращает массив из удаленных элементов
arr.splice(0, 0, 'react')

console.log(arr) 
 */

//@ splice может работать как shift, unshift, push и pop
/*
// splice(0,0,'added') может работать как shift()
arr.splice(0,1)
console.log(arr)*/

/*
// splice(0,0,'added') может работать как unshift()
arr.splice(0,0, 'added')
console.log(arr)*/

/*
// splice(0,0,'added') может работать как push
arr.splice(arr.length, arr.length, 'added')
console.log(arr)*/

/*
// splice(0,0,'added') может работать как pop
arr.splice(arr.length-1, arr.length)
console.log(arr)*/

//§     slice(с какого?, по какой?_не включительно) - возвращает новый массив, в который копирует элементы из исходного
//§НЕ меняет исходный
/* 
let arr = ['html', 'css', 'javascript', 'react']

// let arr3=arr.slice(1,3)
// console.log(arr3)
// console.log(arr)

//скопирует весь массив если не передавать аргументов
let arr2 = arr.slice()
console.log(arr2) 
*/

//§     concat - конкатенация(склеивание), создаст на базе массива новый массив и склеит с элементами, которые передадим в качестве аргументов

/* 
let arr = [1,2,3]

let arr2 = arr.concat([4,5],6,7)
console.log(arr2) 
*/

//§     indexOf(item, from) - ищет item начиная с from, и возвращает индекс на котором был найден элемент, если найден не был вернет -1
//§     lastIndexOf(item, from) - тоже самое, что и indexOf только ищет справа налево
//§     includes(item, from) - тоже самое, только вернет true если найдет в массиве искомый элемент

/* 
let arr = [1, 2, 3, false, -1]
console.log(arr.indexOf(false, 0))
console.log(arr.lastIndexOf(false, 4))
console.log(arr.includes(false, 0)) 
*/

//§     find(item, index, arr) - возвращает первый попавшися элемент подходящий под условие
//§     findIndex(item, index, arr) - тоже самое, что и find, только возвращает индекс элемента подходящего под условие

/* 
let users = [
    { id: 1, name: 'Антон' },
    { id: 2, name: 'Маша' },
    { id: 3, name: 'Саня' },
]

//find
let user = users.find((item) => {
    return item.id == 1
})
console.log(user)

//findIndex
let userIndex = users.findIndex((item) => {
    return item.id == 1
})
console.log(userIndex)
 */

//§     sort(fn) - сортирует массив на месте(т. е. не создавая новый), метод пузырька

/* 
let arr = [1, 15, 2, 0]

//если не передавать функцию, то по умолчанию элементы сортируются как строки
arr.sort()
console.log(arr)

// сортировка методом пузырька, если вернется отрицательное перестановки не будет, если положительное будет перестановка
arr.sort((a, b) => { return (a - b) })
console.log(arr)

//если аргументы поменять местами отсортируется по убыванию
arr.sort((b, a) => { return (a - b) }) 
console.log(arr) 
*/

//§    reverse() - меняет порядов элементов в массиве на обратный 

/* 
let arr = [1, 2, 3, 4, 5]
arr.reverse
console.log(arr) 
*/


//§     split('разделить') - разбивает строку на элементы, которые упаковывает в массив
//§     join('объединить') - собирает из элементов массива строку, вставляя между ними раздилитель


/* 
let names = 'Брайт, Хеп, Нюша, Тимка'

//@split
let arr = names.split(', ')
console.log(arr)

//@если в split передать в качестве аргумента пустую строку, то он разбьет строку на буквы и упакует в массив
let tech = 'javascript'

let arr2 = tech.split('')
console.log(arr2)

//@join
let arr3 = arr2.join(' ')
console.log(arr3)
 */

//§     fill(value, start, end) - ('наполнять') - присвоит какое то значение для элементов массива
/* let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.fill(0,3)
console.log('arr: ', arr); */

//§      spread (...) -  оператор разворачивает в отдельные элементы

/* 
//@SPREAD с массивами
const citiesRussia = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Казань']
const citiesEurope = ['Берлин', 'Прага', 'Париж']

//@можно разворичивать массив (разобрать его на отдельные элементы)
console.log(...citiesRussia)

//@можно копировать и соединять массивы
const allCities = [...citiesRussia, 'Вашингтон', ...citiesEurope]
console.log(allCities)

//@глубокое копирование массива произвольного размера и произвольной вложенности
function makeCopy(arr) {
    let newArr = Array(arr.length)
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr[i] = makeCopy(arr[i])
        } else {
            newArr[i] = arr[i]
        }
    }
    return newArr
}



//§     Оператор Rest собирает все остальные параметры в массив или обьект (выглядит как и spread)

/* 
//@REST применительно к МАССИВАМ
const numbers = [1, 2, 3, 4, 5, 6, 7, 8]

// const a = numbers[0]
// const b = numbers[1]

//мы получаем a и b соответственно по индексам из массива numbers, 
//оператор rest (...) создает массив other в который записывает отстальные значения из массива numbers
const [a, b, ...other] = numbers //кортокая запись того что выше, ДЕСТРУКТУРИЗАЦИЯ (разбивка массива или объекта на отдельные элементы)

console.log(a, b, other); 
*/

//REST применительно к ОБЪЕКТАМ (по аналогии с массивами)

/*//@ деструктуризация массива со вложенными массивами
const arr = ['a', 'b', 'c', [1, 2, 3, [true, false]]]

const [a, b, c, [n1,n2,n3, [bool1, bool2]]] = arr
console.log(a)
console.log(b)
console.log(n1)
console.log(n2)
console.log(n3)
console.log(bool1)
console.log(bool2)*/



/*
? 1) Как переводится слово item?
    *элемент
? 2) Какие методы для массивов ты знаешь?
? 3) Какие способы скопировать массив ты знаешь?
? 4) Что такое значение по умолчанию?
? 5) Как сделать объект итерируемым, что это вооюще значит?
? 6) Как в памяти хранятся объекты и примитывы?
    *Объект хранится где-то, неизвестно где, у нас в переменной только ссылка на этот объект.
    *Объекты копируются по ссылке, а примитивы по значению
? 7) В каком случае объекты будут равны? 
    *Объекты будут равны только если это один и тот же объект
? 8) Что можно делать с помощью spread и rest операторово? В чем между ними отличие?
? 9) Что такое деструктуризация?
? 10) const person2 = {...person, adress: {...person.adress}} //Проговорить как это строчка работает
? 11) как сделать объект итерируемым, что это вообще занчит
*/











//§ Разное 

//@ 1) Быстрое создание массива числе на основе индексов
console.log([...Array(10).keys()])

//@ 2) как оставить в массиве только уникальные значения
//new Set(arr) - вернет коллекцию из уникальных значений передаваемого массива
let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];
//spread оператор
let uniqValues = [...new Set(values)]
console.log(uniqValues)

//Конструктор Array
let uniqValues2 = Array.from(new Set(values))
console.log(uniqValues2)

//@ 3) Array.from() вернет новый экземпляр Array из массивоподобного или итерируемого объекта
Array(26)           //вернет empty x 26
Array('panda')      //['panda']
Array.from('panda') //['p', 'a', 'n', 'd', 'a']
Array.from('panda', (item,index)=>item+' '+index)   //['p 0', 'a 1', 'n 2', 'd 3', 'a 4']


//@ 4) utf 16 - table. Вот так можно получить буквы английского алфавита
let charCodes = Array.from(Array(26)).map((e,i)=>i+65)
let englishLetters = charCodes.map((item)=>String.fromCharCode(item))
console.log(englishLetters)

/*§МЕТОДЫ, КОТОРЫЕ ВОЗМОЖНО ПРИГОДЯТСЯ*/

//@ раскукоживание всех вложенных массивов в один
let arr1 = [1, 2, [3, 4]];
console.log(arr1.flat())    // [1, 2, 3, 4]

//@ создание нового массива
Array.of(7);       // [7]
Array.of(1, 2, 3) // [1, 2, 3]

Array(7);          // массив с 7 пустыми слотами
Array(1, 2, 3);    // [1, 2, 3]