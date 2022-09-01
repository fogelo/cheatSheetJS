//§ Callback function

/* 
//ДЕМОНСТРАЦИЯ ЧТО ТАКОЕ CALLBACK
function greeting(name){
    alert('Hello ' + name)
}

function processUserInput(callback) {
    let name = prompt('Введите ваше имя')
    callback(name)
}
processUserInput(greeting) 
*/

/* 
//CALLBACK ДЛЯ УСТРАНЕНИЯ АСИНХРОННОСТИ В КОДЕ
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
  }
  
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    alert(`Здорово, скрипт ${script.src} загрузился`);
    alert( _ ); // функция, объявленная в загруженном скрипте
  });
   */
//§     Асинхронный код. Как работает EventLoop. Promise

/* 
//@ИМИТАЦИЯ АСИНХРОННОСТИ
let a = 7

//асинхронная операция (EventLoop)
setTimeout((a) => {
    a = 10
    // console.log(a); 
}, 1000)

console.log(a);
//Хотим вывести в консоль 10. Это можно сделать написав его внутри setTimeout, 
//что приведет к аду колбэков если у нас их будет много, либо использовать Promis
 */


/* 
//@ИСПОЛЬЗЫУЕМ ПРОМИС

let a = 7
console.log(a);

let b = new Promise(function (resolve, reject) {
    //наш асинхронный код, то что нам нужно дождаться
    setTimeout(() => {
        a = 10
        //resolve это функция, которая будет выполнена когда код завершиться удачно, в resolve нужно прокинуть то что нужно для дальнейшего выполненич кода в методе then
        resolve(a) 
    }, 1000)
})

//then будет выполнен только тогда когда выполниться промис
b.then(function(){
    console.log(a)
})
 */


/* 
//@ПРИМЕНЕНИЕ ПРОМИСА, ПРИМЕР С lern.javascript.ru
function loadScript(src) {
    return new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        document.head.append(script);
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
    script => alert(`${script.src} загружен!`),
    error => alert(`Ошибка: ${error.message}`)
);

promise.then(script => alert('Ещё один обработчик...'));
 */




/*
? 1) Что такое асинхронный код?
? 2) Как работает EvenLoop?
    *call stack, web api, callback queue. Любые пользовательские интерфейсы(которые ожидают каких то дейсвий от пользователся) чаще всего
    *используют асинхронность
? 3) Что такое Promise?
    * Promise - это объект, который связывает создающий и потребляющий коды вместе.
    * Это возможность дождаться выполнения асинхронной операции и потом продолжить работу с чем либо,
    * чему требуется результат асинхронной операции. Промис позволяет синхронно писать асинхронный код
? 4) Что такое ajax запрос? Как расшифровывается абревиатура ajax?
    *асинхронная операция, важно дождаться когда придет результат. Для это нужно использовать Promise
? 5) Что такое цепочка промисов?
? 6) Что такое callback function?
? 7) Что такое адская пирамида колбэков?
    *это функция которая вызывается из другой функции по завершению какго либо процесса
*/

/* 
промис это объект у которго есть метод then, then в свою очередь возвращает еще еще один промис

*/


//§ допилить еще сюда async await