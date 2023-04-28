/* 
§ Асинхронность 

Как использовать асинхронные средства с максимальной эффективностью?

*/

/* 

§ Цикл событий 


Движок js не работает в изоляции, он работает внутри управляющей среды (веб-браузер, nodejs). У управляющей среды есть механизм, который обеспечивает выполнение
нескольких фрагментов вашей программы обращаясь с вызовами к движку js в разные моменты времени. Этот механизм называется циклом событий.

Что-то выполняется сейчас, а что-то потом? Блоки кода - сейчас и блоки кода - потом.
Каждый раз когда вы упаковываете фрагмент кода в функцию и указываете, что она должна будет выполнена по некоторому событию (таймер, шелчок 
    мышью, ответ ajax и тд ). Вы в своем коде создаете блок потом, а следовательно вводите асинхронность в свою программу.


    ?У программы есть состояние, это значит, что переменным на данный момент времени присовены какие-то значения. Все блоки потом срабатывают после всех 
    ?блоков сейчас. А значит будут использовать состояние уже после синхронного кода.

    Асинхронность - управление промежутком между сейчас и потом.
    Параллелизм - одновременное выполнение операций.

    Параллелизм. Процессы и потоки (threads). Несколько потоков могут использовать общую память одного процесса.
    Цикл событий разбивает свою работу на задачи и выполняет их последовательно, что делает невозможным паралльельный доступ и изменения в общей памяти.

    tasks queue - потом
    job queue - потом, но как можно скорее.


    Программ Javascript (практически) всегда разбивается на 2 и более блока. Первый блок выполняется сейчас, а второй потом в ответ на событие. Хотя 
    программа выполняется по блокам, все они совместно используют одинаковый доступ к области видимости и состоянию программы. Так что каждое изменение
    состояния осуществляется поверх предыдущего состояния.
*/

// @ Пример 1, блоки сейчас и блоки потом. Чему могут быть равны a и b? (псевдо код)
/* var a = 1;
var b = 2;
function foo() {
    a++;
b = b * a;
a = b + 3; }
function bar() {
    b--;
a = 8 + b;
b = a * 2; }
// ajax(..) - произвольная функция Ajax из библиотеки
ajax( "http://some.url.1", foo );
ajax( "http://some.url.2", bar ); */

// @ Пример 2, интересное использвание асинхронности для оптимизации (псевдокод)

// Вот так если массив data большой, то его преобразование займет большое колиичество времени, что в итоге надолго заблокирует остальные действие,
//  так как это будет засчитано за одну операцию, но мы можем разбить это с помощью асинхронности на несколько
/* var res = [];
// `response(..)` получает массив результатов от вызова Ajax
function response(data) {
    // добавить в существующий массив `res`
    res = res.concat(
        // создать новый преобразованный массив
        // с удвоением всех значений `data`
        data.map( function(val){
return val * 2; })
); }
// ajax(..) - произвольная функция Ajax из библиотеки
ajax( "http://some.url.1", response );
ajax( "http://some.url.2", response ); */

// вот таким образом
/* var res = [];
// `response(..)` получает массив результатов от вызова Ajax
function response(data) {
    // Данные будут обрабатываться по 1000 записей
    var chunk = data.splice(0, 1000);
    // добавление в существующий массив `res`
    res = res.concat(
        // создание нового преобразованного массива
        // с удвоением всех значений `chunk`
        chunk.map(function (val) {
            return val * 2;
        })
    );
    // остались данные для обработки?
    if (data.length > 0) {
        // асинхронное планирование следующего пакета
        setTimeout(function () {
            response(data);
        }, 0);
    }
}
// ajax(..) - произвольная функция Ajax из библиотеки
ajax("http://some.url.1", response);
ajax("http://some.url.2", response); */

/* 

§ Обратные вызовы (callback)

Паттерн "обратный вызов" является самым фундаментальным асинхронным паттерном в языке.


Наш мозг работает примерно по такому же принципу, что и очередь цикла событий.
*/

// @ Пример 1 - Что выведет и почему?
/* const arr =[]
arr[1] = 5
console.log(arr); */

// @ Пример 2 - синтаксис getterов и setteroв ES5.1
/* const a = 1
c = {
    get bar() {
        console.log(a);
        return 2;
    }
};

console.log(c.bar); */

// @ Пример 3 - Проверка не прошло ли время когда функцию можно еще вызвать. Написать самостоятельно эту логику.
/* function timeoutify(fn, delay) {
  var intv = setTimeout(function () {
    intv = null;
    fn(new Error("Timeout!"));
  }, delay);

  return function () {
    // тайм-аут еще не случился?
    if (intv) {
      clearTimeout(intv);
      fn.apply(this, arguments);
    }
  };
}

function foo(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
} */
// ajax("http://some.url.1", timeoutify(foo, 500));

// @ Пример 4 - Проверка не прошло ли время когда функцию можно еще вызвать. Написать самостоятельно эту логику.

/* function asyncify(fn) {
  var orig_fn = fn,
    intv = setTimeout(function () {
      intv = null;
      if (fn) fn();
    }, 0);
  fn = null;
  return function () {
    // активируется слишком быстро, до срабатывания
    // таймера `intv`,
    // обозначающего прохождение асинхронного периода?
    if (intv) {
      fn = orig_fn.bind.apply(
        orig_fn,
        // добавить `this` обертки в параметры вызова
        // `bind(..)` и каррировать все переданные
        // параметры.
        [this].concat([].slice.call(arguments))
      );
    }
    // асинхронно
    else {
      // вызвать исходную функцию
      orig_fn.apply(this, arguments);
    }
  };
}
function result(data) {
  console.log(a);
}
var a = 0;
ajax("..pre-cached-url..", asyncify(result));
a++; */

/* 
Обратные вызовы всегда лучше делать асинхронными, этот пример демонстрирует как это можно сделать 
*/

// § Обещания
/* 

Недостатки использования обратных вызовов для выраражения асинхронности в прогамме:
1) осутствие последовательности 
2) отсутствие доверия (из-за инверсии управления)
Как промисы решают этим недостатки?


 Promise.all([...]) - получает массив обещаний, и возвращает новое обещание, которое дожидается завершения всех обещаний в массиве. 
*/

// @ Пример 5 - promise - что выведет и почему?
/* const resolve = () => {
  return 2;
};

const promise = new Promise((resolve, reject) => {
  resolve(1);
  // reject(2);
})
  .then((res) => {
    console.log(res);
    throw new Error();
  })
  .catch((res) => {
    console.log(res);
  });
console.log(promise); */

/* 
функции resolve и reject - это функции разрешения обещания. resolve - сигнализирует о выполнении, а reject сигнализирует об отказе

*/

// @ Пример 6 -  что выведет и почему? (Псевдокод)
/* p.then(function () {
  p.then(function () {
    console.log("C");
  });
  console.log("A");
});
p.then(function () {
  console.log("B");
}); */
// A B C

// @ Пример 7 -  что выведет и почему?
/* let p3 = new Promise( function(resolve,reject){
  resolve( "B" );
} );

let p1 = new Promise( function(resolve,reject){
  resolve( p3 );
} );

let p2 = new Promise( function(resolve,reject){
  resolve( "A" );
} );
p1.then( function(v){
  console.log( v );
} );

p2.then( function(v){
  console.log( v );
} );
 */

/* 

согласно определенному поведению происходит распаковка p3 в p1, но асинхронно, так что обратный вызов p1 оказывается позади обратного вызова p2 
в асинхронной очереди заданий. 

Вообще говоря, хорошая практика программирования не реко- мендует программировать так, чтобы зависеть от порядка несколь- ких обратных вызовов.
*/

/* 
обещания определяются так, чтобы они могли разрешиться только один раз. Если по какой-то причине код создания обещания попытается многократно 
вызвать resolve или reject или попытается вызвать обе функции, обещание примет только разрешение и незаметно проигнорирует все последующие попытки. 
*/

// const todos = new Promise((resolve, reject)=>{
//   resolve(

//   )
// })

// @ Пример 8 -  что выведет и почему? Демонстрация как race можно использовать для того чтобы ограничить функцию по времени.

/* const foo = () => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("foo");
    }, 10);
  }); 
};
// функция определения тайм-аута для обещания
function timeoutPromise(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Timeout!");
    }, delay);
  });
}
// настройка тайм-аута для `foo()`
Promise.race([
  fetch("https://jsonplaceholder.typicode.com/todos/1"), // попытаться выполнить `foo()`
  foo(),
  timeoutPromise(1000), // выделить 3 секунды ])
]).then(
  function (res) {
    // функция `foo(..)` выполнена вовремя!
    console.log(res);
  },
  function (err) {
    console.log(err);
    // либо функция `foo()` столкнулась с отказом, либо
    // просто не завершилась вовремя; проанализировать
    // `err` для определения причины
  }
) */
// @ Пример 9 -  что выведет и почему?

/* const promise1 = new Promise((resolve, reject) => {});

const promise2 = new Promise((resolve, reject) => {
  resolve(111);
  reject(222);
});
const promise6 = new Promise((resolve, reject) => {
  resolve(111);
  reject(222);
}).finally((res)=>{
  console.log(res);
}, )

const promise3 = new Promise((resolve, reject) => {
  reject(222);
  resolve(111);
})

const promise4 = new Promise(function (resolve, reject) {
  foo.bar(); // `foo` не определено, ошибка!
  resolve(42); // в эту точку управление не передается :(
}).then((res)=>{})

const promise5 = new Promise(function (resolve, reject) {
  foo.bar(); // `foo` не определено, ошибка!
  resolve(42); // в эту точку управление не передается :(
}).then((res)=>{}, (err)=>{})

console.log(promise1);
console.log(promise2);
console.log(promise3);
console.log(promise4);
console.log(promise5); */


// @ Пример 10 -  что выведет и почему?

var p = new Promise( function(resolve,reject){
  foo.bar();  // `foo` не определено, ошибка!
  resolve( 42 );  // в эту точку управление не передается :(
} );
p.then(
  function fulfilled(){
      // в эту точку управление не передается :(
  },
  function rejected(err){
      // здесь `err` будет объектом исключения `TypeError`
      // из строки `foo.bar()`.
  }
);


// const todos = fetch("https://jsonplaceholder.typicode.com/todos/1");
// .then(response => response.json())
// .then(json => console.log(json))

// console.log(todos);

// § Ссылки
// ? https://blog.greenroots.info/task-queue-and-job-queue-deep-dive-into-javascript-event-loop-model

   console.log(history.push("/123"));