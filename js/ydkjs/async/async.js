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

/* var p = new Promise( function(resolve,reject){
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
); */

// @ Мой пример 10 -  что выведет и почему?

/* let a = 0;

const d = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5);
    console.log(a);
  }, 1);
}).then((res) => {
  console.log(a);
});

setTimeout(function () {
  a = 1;
  console.log(a);
}, 0);

console.log(a);

const c = Promise.resolve(42).then((res) => {
  console.log(a);
  a = res;
  console.log(a);
});

console.log(a);
console.log(d); */

// @ Мой пример 11 -  что выведет и почему?

/* const foo = () => {
  return 111
};
const v = Promise.resolve(foo()).then(res=>{
  console.log(res);
  // return Promise.resolve(res)
}).then(res=>{
  console.log(res);
})
const v2 = Promise.resolve(foo())
console.log(v);
console.log(5)
console.log(v2); */

// @ Мой пример 12 -  что выведет и почему?

/*  const foo = () => {
  return 111
};
const a = foo()
const b = Promise.resolve(foo())
const d = Promise.resolve(foo()).then(res=>{
  console.log(res);
})

console.log(b);
console.log(a);
console.log(d);
 */

// @ Мой пример 13 -  что выведет и почему? Демонстрация сцепления then
/* var p = Promise.resolve( 21 );
var p2 = p.then( function(v){
    console.log( v );   // 21
    // выполнение `p2` со значением `42`
     return v * 2;
} );
console.log(p2);
// сцепление `p2`
p2.then( function(v){
    console.log( v );
} ); */

// @ Мой пример 14 -  что выведет и почему? Введение setTimeout, так можно создавать задержку для следующего шага

/* var p = Promise.resolve( 21 );
p.then( function(v){
    console.log( v );   // 21
    // создать обещание для возвращения
    return new Promise( function(resolve,reject){
        // ввести асинхронность!
        setTimeout( function(){
            // выполнить со значением `42`
            resolve( v * 2 );
        }, 100 );
} ); })
.then( function(v){
    // выполняется после 100-миллисекундной задержки
     // на предыдущем шаге
    console.log( v );   // 42
} );
 */

// @ Пример 15 -  что выведет и почему?

/* function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}
delay(100) // шаг 1
  .then(function STEP2() {
    console.log("step 2 (after 100ms)");
    return delay(200);
  })
  .then(function STEP3() {
    console.log("step 3 (after another 200ms)");
  })
  .then(function STEP4() {
    console.log("step 4 (next Job)");
    return delay(50);
  })
  .then(function STEP5() {
    console.log("step 5 (after another 50ms)");
  }); */

// @ пример 16 -  что выведет и почему?

/* // шаг 1:
fetch("https://jsonplaceholder.typicode.com/todos/1")
  // шаг 2:
  .then(function (response1) {
    foo.bar(); // undefined, ошибка!
    // сюда управление не передается
    return fetch("https://jsonplaceholder.typicode.com/todos/2");
  })
  // шаг 3:
  .then(
    function fulfilled(response2) {
      // сюда управление не передается
    },
    // обработчик отказа для перехвата ошибки
    function rejected(err) {
      console.log(err);
      // ошибка `TypeError` из `foo.bar()`
      return 42;
    }
  )
  // шаг 4:
  .then(function (msg) {
    console.log(msg);
  }); */

/* 
  
  Когда на шаге 2 происходит ошибка, обработчик отказа на шаге 3 перехватывает его. Возвращаемое значение от этого обработчика отказа (42 в данном фрагменте), если оно есть, выполняет обе- щание для следующего шага (4), так что цепочка снова находится в состоянии выполнения.
  

  У паттерна then(null,function(err){ .. }), который обра- батывает только отказы, но пропускает выполнения, существу- ет сокращенная запись в API: catch(function(err){ .. }) . Конструкция catch(..) будет более полно рассмотрена в сле- дующем разделе.
  */
/* 
  
  Вызов delay(200) создает обещание, которое будет выполнено через 200 мс.
  Сконструированная нами цепочка обещаний не только обеспечи- вает управление программной логикой, выражающей многошаго- вую асинхронную последовательность, но и работает как канал сообщений для передачи сообщений от шага к шагу.
  */

// @ Пример 17 -  что выведет и почему? Обработка ошибок

/* function foo() {
  setTimeout(function () {
    baz.bar();
  }, 100);
}
try {
  foo();
  // позднее выдает глобальную ошибку из `baz.bar()`
} catch (err) {
  // управление сюда не передается
} */

/* 
Самая естественная форма обработки ошибок для большинства разработчиков — синхронная конструкция try..catch.
Если сама функция baz.bar() является асин- хронно завершаемой, то никакие асинхронные ошибки в ней перехватываться не будут.
*/

// @ Мой пример 18 -  что выведет и почему?

/* document.addEventListener("click", ()=>{
  console.log(777);
})

setTimeout(() => {
  console.log(333);
}, 3);

setTimeout(() => {
  console.log(222);
}, 0);

new Promise((resolve, reject) => {
  console.log(666);
  setTimeout(() => {
    resolve(555);
  }, 0);
}).then((res) => {
  console.log(res);
});

new Promise((resolve, reject) => {
  resolve(444);
})
  .then((res) => {
    console.log(res);
    return res + 1;
  })
  .then((res) => {
    console.log(res);
    return res;
  })
  .finally((res) => {
    console.log(res);
  });

console.log(111);


let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});
document.dispatchEvent(event) */

// § Генераторы

/* 

Генераторы — новая разновидность функций ES6, которые не вы- полняются до завершения, как обычные функции. 

yield нужна для нарушения принципа выполнения функции до завершения. foo является функцией-генератором. Она конструирует и возвращает итератор, 
который будет управлять выполненимем функции-генератора. Каждый вызов next() выполняет функцию до yield и останавливается, чтобы 
продолжить выполнение нужно запустить next еще раз. Благодаря этому после yield можно вклинить еще какой-то код и продолжить выполнение функции foo()

Итак, генератор - это особая разновидность функций, которые могут запускаться и останавливаться один или несколько раз и даже не обязательно
завершают свое выполнение.

Мощь генераторов на первый взгляд неочевидна, но они одни из основных структурных элементов, используемых для управления асинхронной логикой




*/

// @ пример 19 -  что выведет и почему?

/* var x = 1;

function* foo() {
  x++;
  console.log("x:", x);
  yield; // приостановка!
  console.log("x:", x);
}

function bar() {
  x++;
}
var it = foo();
console.log(it);
console.log(x);
it.next();
bar();
console.log(x);
it.next(); */
// @ пример 20 -  что выведет и почему?

/* function* foo(x, y) {
  return x * y;
}
var it = foo(6, 7); // создаем объект-итератор для управления генератором *foo(..) и присваиваем его переменной it.
var res = it.next(); // После этого вызывается метод it.next(), который приказывает генератору *foo(..) переместиться от текущей позиции либо до следующей позиции yield, либо до конца генератора. yield - это что-то вроде промежуточного return.


console.log(res); */

// @ пример 21 -  что здесь происходит?

/* function* foo(x) {
  var y = x * (yield);
  return y;
}
var it = foo(6); // возвращает объект итератор для упралвения генератором, в параметрах передаем x

var res;
res = it.next(); //запускаем обработку до yield, выполнение обрывается на yield
console.log(res);

res = it.next(7); // запускает обработку с yield, в параметрах передаем результат для выражения yield (как-бы yield = 7). 
// return возварщает результат.  А что будет если не передать аргумент? 

console.log(res); */

/*  

Первый вызов next(..) всегда запускает генератор и выполняет его до первого yield. Второй вызов next(..) выполняет первое приостановленное выражение yield, третий вызов next(..) вы- полняет второе выражение yield, и т. д.


var y = x * (yield);
return y;
Первое вхождение yield, по сути, задает вопрос: «Какое значение я должен подставить сюда?» 
Кто должен ответить на этот вопрос? Что ж, первый вызов next() уже был выполнен для того, чтобы привести генератор в эту точку, поэтому очевидно, что он не может дать ответ. Таким образом, на вопрос, поставленный первым yield, должен ответить второй вызов next(..).
*/

// @ Мой пример 22 -  что здесь происходит?

/* function* foo (){
  console.log(yield);
  // return yield
}

const it = foo()
console.log(it);

let res = it.next()
console.log(res);
res = it.next("hello")
console.log(res);
 */

// @ Мой пример 23 -  что здесь происходит?

/* function* foo(x) {
  var y = x * (yield "Hello"); // <-- возвращает значение!
  return y;
}
var it = foo(6);
var res = it.next();
console.log(res);
res = it.next(7);
console.log(res);
 */
/* 

при вызове next yield может возвращать значение, и при вызове next на место yeild встает параметр который мы передадим
*/

// @ Пример 23 -  что здесь происходит? Множественные итераторы

/* 
Существует один нюанс, который легко упустить из виду: каждый раз, когда вы создаете итератор, вы неявно создаете экземпляр генератора, которым этот итератор будет управлять.

Несколько экземпляров одного генератора могут работать одновременно и даже взаимодействовать друг с другом.

 */

/* function* foo() {
  var x = yield 2;
  z++;
  var y = yield x * z;
  console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value;
var val2 = it2.next().value;
console.log(val1, val2);

val1 = it1.next(val2 * 10).value;
val2 = it2.next(val1 * 5).value;
it1.next(val2 / 2);
it2.next(val1 / 4); */

/* 

Почему генератор назван генератором (производителем). Итератор представляет четко определенный интерфейс для перебора сзначений от производителя.
JS интерфейс итераторов как и для большинства языков основан на вызове next() каждый раз когда вы хотите получить новое значение от генератора (производителя значений)


Итерируемый объект - это объект, который содержит итератор (метод), который может использоваться для перебора его значений.


async/await - это преимущества двух миров (генераторы и промисы)
*/

//§ Быстродействие программ

/* 

Почему асинхронность вообще важна для js? Наиболее очевидная причина - быстродейвствие.

Например вам понадобилось выдать 2 запросы, которые не зависят друг от друга, но вам необходимо дождаться завершения их обоих чтобы перейти к следующей операции. Это взаимодейсвтвие можно построить по двум моделям: последовательной и параллельной.


Что такое web workers? Это возможность браузера (управлющей среды), которая не имеет почти никакого отношения к самому языку js.
Такая среда как браузер может предоставить несколько экземпляров движка js, каждое из которых выполняется в отдельном потоке. И дать вам возможность запустить разные программы в разных потоках. Каждая из отдельных потоковых частей программы назвается веб работником.
Данная разновидность параллелизма называется праллелизмом на уровне задач, так как основное внимание в ней уделяется разбиению программы на части
для параллельного выполнения.

*/


document.addEventListener("click", function aaa(){
  console.log(111);
  debugger
})

// § Факультатив. XMLHttpReques и Fetch
//
/* 

XMLHttpRequest - встроенный в браузер объект, который дает возможность делать запросы к серверу без перезагрузки страницы. Не смотря на
наличие XML он может работать с любыми типами данных. Более современный аналог метод fetch.


Если функция возвращает Promise, тогда ей пишем async. await - значит, что на следующую строчку перейдем только когда ответ будет получен.
*/


const xhr = new XMLHttpRequest()

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1')
xhr.send();
xhr.onload = function() {
  console.log(xhr.response)
console.log(JSON.parse(xhr.response))
};




// § Разное

// @ пример - что вернет?
/* 
const foo = async () => {
  return 1
};

console.log(foo().then(res=>{console.log(res)})); */

// § Ссылки
// ? https://blog.greenroots.info/task-queue-and-job-queue-deep-dive-into-javascript-event-loop-model - про таски

// ? онлайн демонстрация цикла событий.
// ? http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

// console.log(b);
// const todos = fetch("https://jsonplaceholder.typicode.com/todos/1");
// .then(response => response.json())
// .then(json => console.log(json))

// console.log(todos);
