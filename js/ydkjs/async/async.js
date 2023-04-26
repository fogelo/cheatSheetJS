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
2) отсутствие доверия
Как промисы решают этим недостатки?
*/

// § Ссылки
// ? https://blog.greenroots.info/task-queue-and-job-queue-deep-dive-into-javascript-event-loop-model
