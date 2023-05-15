//§ Конструктор Object и его методы

/*
// @keys - возвращает массив ключей объекта (строками), values - возвращает массив значений,
// @entires - возвращает массив из двух массивов(массив ключей и массив значений)
// @values
let obj = { name: 'anton', age: '30' }
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));*/

// @проходит по ключам (индексам)
// c помощью for...in можно так же получить ключи объекта (можно применять и к массивам, но плохая практика так как for...in
// принимает и нечисловые ключи)
/*
for (let index__key in obj) {
    console.log(index__key)
}
*/

//§ ГЛУБОКОЕ И НЕГЛУБОКОЕ КЛОНИРОВАНИЕ ОБЪЕКТОВ
/*//@ 1) глубокое копирование с помощью объекта JSON
const person = {
    name: 'anton',
    age: 20,
    adress: {
        country: 'Russia',
        city: 'Moscow'
    }
}

let str = JSON.stringify(person) // возвращает объект в виде строки
console.log(str)
let deepCopyOfPerson = JSON.parse(str) // возвращает объект
console.log(deepCopyOfPerson)*/


/*
//@ 2) Object.assign() неглубокое копирование объекта с помощью конструктора
let player = {score: 1, name: 'Джефф'};
let newPlayer = Object.assign({}, player, {score: 2}); // as sign - назначить, присвоить*/


/*//@SPREAD с объектами
const citiesRussiaPopulation = {
    Moscow: 15,
    Kazan: 3,
    Novosibirsk: 2,
}

const citiesEuropePopulation = {

    Berlin: 10,
    Praga: 5,
    Paris: 2,
}

//@можно также копировать и соединять объекты
console.log({ ...citiesRussiaPopulation })
console.log({ ...citiesRussiaPopulation, ...citiesEuropePopulation })

//@ 3) СОЗДАНИЕ ГЛУБОКОЙ КОПИИ С ПОМОЩЬЮ SPREAD ОПЕРАТОРА
const person = {
    name: 'anton',
    age: 20,
    adress: {
        country: 'Russia',
        city: 'Moscow'
    }
}

//@делаем глубокую копию объекта
const person2 = {...person}
person2.adress = {...person.adress}

//@можно сделать глубокую копию синтаксически короче, чем это написан выше
const person2 = {...person, adress: {...person.adress}}


//@Проверка что объекты разные
person.name = 'ivan'
person.adress.city = 'Novosibirsk'
console.log('person: ', person);
console.log('person2: ', person2);*/


/*//@ 4) глубокое копирование с помощью библиотеки lodash (подключил в index.html)
const person = {
    name: 'anton',
    age: 20,
    adress: {
        country: 'Russia',
        city: 'Moscow'
    }
};

let deep = _.cloneDeep(person); //cloneDeep функция, создающая глубокую копию

//прверка, что копия действительно глубокая
deep.test = '42'
deep.adress.test = '42'
console.log(person)
console.log(deep)
console.log(deep === person);*/


//§ ДЕСТРУКТУРИРУЮЩЕЕ ПРИСВАИВАНИЕ
/*const product = {
    price: 3990,
    options: [
        {
            id: 1,
            title: '256ГБ',
            price: 450,
        },
        {
            id: 2,
            title: '512ГБ',
            price: 990,
        }
    ],
    info: {
        screen: {
            size: {
                width: 1920,
                height: 1080
            }
        }
    }
}*/

//@ деструктуризация
/*const {price, options, info} = product
console.log(price)
console.log(options)
console.log(info)*/

//@ деструктуризация вложенных объектов
/*const {info: {screen: {size: {width, main = 145}}}} = product // таким образом получили переменную width в отрыве от объекта
console.log(width, main)
console.log(product)*/

//@ деструктуризация с использованием rest
/*const {info, ...rest} = product
console.log(info)
console.log(rest)*/


//@ деструктурирующее присваивание
/*const HIGH_TEMPERATURES = {
    yesterday: 75,
    today: 77,
    tomorrow: 80
};

const {today: today, tomorrow} = HIGH_TEMPERATURES // если не указать явно какой перменной присваиваешь значение, она назовется так же ив объекте
console.log(today)
console.log(tomorrow)*/


//§ проверка объекта на наличие в нем свойства
let users = {
    Alan: {
        age: 27,
        online: true
    },
    Jeff: {
        age: 32,
        online: true
    },
};

//@ метод hasOwnProperty()
console.log(users.hasOwnProperty('Alan'))

//@ конструкция с помощью in
console.log('Alan' in users)


//§ МЕТОДЫ ДЛЯ ОБЪЕКТОВ, КОТОРЫЙ ВОЗМОЖНО ПРИГОДЯТСЯ

//@ Object.freeze(obj) замораживает объект, то есть запрещает изменят его


//?--Про ассоциативный массив от Димыча----------------------------------------------------
//? Ассоциативный массив - это просто объекты

let user1 = {
    name: 'Anton',
    age: 30,
    lessons: [{ title: '1' }, { title: '2' }],
    address: {
        city: {
            title: 'Moscow'
        }
    }
}

//?чтение свойств
//Dot notation
let title1 = user1.address.city.title
//альтернативная запись
let title2 = user1['address']['city']['title']

let user2 = {
    'name': 'Anton',
    'age': 30,
    'lessons': [{ title: '1' }, { title: '2' }],
    'address': {
        'city': {
            'title': 'Moscow'
        }
    }
}

//вот так можно создать новое свойство в объекте (обычным присваиванием)
let city = {}
city.title = 'Moscow'
city['citizensCount'] = 100

//можно даже map вот так у массива вызвать
let users2 = [1, 2, 3, 4, 5]
users2['map']((item) => {
    console.log(item)
})

//а вот и ассоциативный массив - когда в объекте хранятся данные в виде масивноподобной структуры
let usersObj = {
    '0': 'anton',
    '1': 'dimych',
    '2': 'valera',
    '3': 'Katya',
}

usersObj['1']
Object.keys(usersObj) // получим массив ключией
Object.values(usersObj) // получим массив значений

//можно создать большой ассоциативный объект
let a = {}
for (let i = 0; i < 100; i++) {
    a[i] = 'yo'
}


/* 
Свойства могут быть доступны либо через точечную нотацию (т.е., obj.a), либо через скобочную нотацию (т.е., obj["hello world!"])
*/

// Можно проверить, содержит ли объект некоторое свойство, не запрашивая значение этого свойства:
var myObject = {
    a: 2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false



//  Оператор in