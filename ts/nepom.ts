// § Аннотиации и определение типа в typescript
/* 
- Тип - это набор значений, которые могут присваиваться в переменную

- в JS всего 8 типов

1) undefined
2) null
3) boolean
4) string
5) number
6) BigInt
7) object
8) Symbol

В js для переенных не указывается какой конкретный набор значений (тип) может хранится в этих переменных.
Динамическая типизация означает, что переменная может хранить любой набор значений. 
Статическая типизация означает, что мы задаем какой конкретный тип может хранить переменная.

*/

// § Массивы и объекты в ts

const arr1: string[] = ["1", "2"];
const arr3: Array<string> = ["1", "2"];

// что ts выведет и почеу?
const arr2 = ["1", 2];

// Что означает такая запись?
const arr4: string[][] = ["1", "2"];
const arr5: Array<Array<string>> = ["1", "2"];

// кортеж(tuple) - массив с конкретным числом элементов и конкретным их типом
const tuple3: [string, boolean, number] = ["qwe", false, 0];

// массив кортежей, удобно работать так с содержимим csv файлов
const tuples: [string, string, number][] = [
  ["sf", "asdf", 0],
  ["sf", "asdf", 1],
  ["sf", "asdf", 2],
];

// ? интерфейсы

// @Пример 1. Как задавать интерфейс и ништяки внутри него
interface MyObject {
  readonly a: number; // работает только на уровне типов, на исполнение никак не влияет
  b: number;
  c?: string;
  print1(): number;
  print2: () => number;

  // можем так же указать неограниченное колличество свойств, ключом для которых будут например строки
  [key: string]: string | (() => number) | number | undefined;
}

const obj: MyObject = {
  a: 1,
  b: 2,
  print1() {
    return 1;
  },
};

// @Пример 2. Как расширять интерфейс.

interface IPerson {
  name: string;
}

interface IAccount {
  email: string;
  login: string;
}

// Вариант 1
/* interface IDeveloper extends IPerson, IAccount {
    skills: string[]
} */

// Вариант 2
type IDeveloper = IPerson & IAccount & { skills: string[] };

/* 
в IDeveloper нужно будет обязательно указать все поля, которые есть во всех этих интерфейсах 
*/

// § Типизация функций

// @Пример 3. Функция не будет ругаться?
/*
interface Printable {
    label: string
}

function printReport(obj: Printable): void{
    console.log(obj.label);
}

const drink1 = {
    label: "a",
    price: 10
}
const drink2 = {
    price: 10
}
printReport(drink1) // не ругается, так как нам необходимо удоволетворить набор параметров (полей), которые функция ожидает, но в 
// передаваемом объекте полей может быть и больше
printReport(drink2) // ругается 
 */

// @Пример 4. Перегрузка (overload). Когда функция может принимать и возвращать разные типы данных

/* 
 В зависимости от того что функция будет принимать, должны быть разные сценарии внутри самой функции
 */
// Для того чтобы это типизировать мы можем несколько раз объявить функцию

function pickCard(x: number): number;
function pickCard(x: string): string;
function pickCard(x) {
  if (typeof x === "number") {
    return x;
  }
  if (typeof x === "string") {
    return x;
  }
}

// § generics или универсальные типы, обобщения
/* 
Для понимания что такое дженерики можно провести аналогию с обычними функциями. и получается что дженерик - это просто аргумент

дженерик нужен для создания чего-то универсального
*/

// @Пример 5. Что такое дженерик по аналогии с функцией
// функция
const valueFactory = (x: number) => x;
const myValue = valueFactory(11);

// дженерик
type TypeFactory<X> = X;
type MyType = TypeFactory<number>;
/* 
Принимает через угловые скобки некий параметр, который является типом
*/

// @Пример 6. дженерик
interface ValueContainer<Value> {
  value: Value;
}

type StringContainer = ValueContainer<string>;
const x1: StringContainer = { value: "123" };

// @Пример 7. дженерик, создание универсалоьного класса.
class ArrayOfNumbers {
  constructor(public collection: number[]) {
    // this.collection //это можно в ts опустить присвоится автоматически
  }
  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) {}
  get(index: number): string {
    return this.collection[index];
  }
}

class ArraOfAnything<T> {
  constructor(public collection: T[]) {}
  get(index: number): T {
    return this.collection[index];
  }
}
new ArrayOfNumbers([1, 2, 3]);
new ArrayOfStrings(["sf", "af"]);

new ArraOfAnything<number>([1, 2, 3]);
new ArraOfAnything<string>(["af", "asf", "hfdg"]);

// @Пример 8. дженерик, объявление функции

function printNumber(a: number): void {
  console.log(a);
}

function printString(a: string): void {
  console.log(a);
}

function printAnything<T>(a: T) {
  console.log(a);
}

printAnything<string>("asf");
