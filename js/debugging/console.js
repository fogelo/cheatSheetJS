//log, dir, warn, error, debug


//вот так можно вывести в консоль время, за которое выполнится программа
console.time('цикл')
for (let i = 0; i < 100; i++) {
    i += 1
}
console.timeEnd('цикл')

/*?------------------------------------------------------------------------------------*/
//вот так можно свернуть слишком длинный вывод в консоль
console.group()
for (let i = 0; i < 10; i++) {
    console.log(i)
}
console.groupEnd()

/*?------------------------------------------------------------------------------------*/
//вот так можно свернуть слишком длинный вывод в консоль (аналогична group, только свернута изначально)
console.groupCollapsed()
for (let i = 0; i < 10; i++) {
    console.log(i)
}
console.groupEnd()

/*?------------------------------------------------------------------------------------*/

//вот так можно вывести стек вызовов из точки в коде где был вызван метод
function hello2() {
    function hello() {
        console.trace()
        return 2
    }

    hello()
    return 1
}

hello2()
/*?------------------------------------------------------------------------------------*/

//проверяет выражение, переданное первым параметром, и если выражение ложно, записывает в консоль ошибку вместе со стеком вызовов
let two = 3;
let three = 2;
console.assert(two < three, 'два меньше трех');
/*?------------------------------------------------------------------------------------*/


console.log(String)
console.dir(String)
console.warn('Предупреждение')
console.error('Ошибка')
console.debug(String) //чет не работает
console.dirxml(String)
console.info('Тоже что-то выводит')
