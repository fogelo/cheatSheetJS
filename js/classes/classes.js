console.log('================================ Классы ================================')
//§КЛАССЫ 

//Создание класса
class Person {
    constructor(name, age, city) {
        this.name = name
        this.age = age
        this.city = city
    }
    sayHello() {
        console.log('Hello ' + this.name)
    }
}

//Создание однотипных объектов на базе классов (экземпляры класса - инстансы)
let person1 = new Person('Anton', 30, "Moscow")
let person2 = new Person('Ivan', 25, "Krasnoyarsk")

//Вывод примеров в консоль
console.log(person1)
console.log(person1.sayHello())
console.log(person2)
console.log(person2.sayHello())

//Наследование. Класс User наследуется от класса Person и раширяет его
class User extends Person {
    constructor(name, age, city, email) {
        super(name, age, city); // в эту функцию передаем параметры, которые нужны родительскому классу, по сути это constructor родительского класса
        this.email = email
    }
}

//Создание обьекта на базе класса User  
let user1 = new User('Aleksey', 27, "Rostov", 'Aleksey@yandex.ru')
console.log(user1)
console.log(user1.sayHello())

console.log('==================== Функция конструктор ============================')

//§ФУНКЦИЯ КОНСТРУКТОР

//Создание функции конструктора
function Dog(name) {
    //var this = {}
    this.dogName = name
    this.voice = function () {
        console.log('gavgav ' + this.dogName)
    }
    //return this
}

let dog1 = new Dog('Нюша');
let dog2 = new Dog('Брайт')

console.log(dog1)
console.log(dog2)
console.log(dog1.voice('Нюша'))
console.log(dog2.voice('Брайт'))



/*
? 1) Что делает оператор New?
    * Оператор new вызвает функцию конструктор особым образом(создает пустой обьект this и возвращает его)
? 2) Что такое this?
    * this - это объект от чьего имени вызвана функция(контекст вызова)
? 3) Что такое класс?
? 4) Что такое функция конструктор?
    * функция конструктор служит для того, чтобы клепать однотипные объекты
? 5) Что такое инстанс?
    * инстанс - это экземпляр класса
*/
