//§ parseInt('строка с числом в какой-то системе исчисления', число обозначающее систему исчисления)

parseInt("1111", 2);
parseInt("15*3", 10);

//§ Объект String

const str = 'A11222233334444'

//@ slice(start, stop)
/*console.log(str)
console.log(str.slice())      // slice без аргументов скопирует просто всю строку
console.log(str.slice(2, 4))  // скопирует со 2-го до 4
console.log(str.slice(2, -4)) // скопирует со 2-го до 4-го с конца
console.log(str.slice(-2, 4)) // пустая строка, так как указываем с -2 до 4, а slice умеет работать только вправо)
console.log(str.slice(2))     // скопирует со 2-го до конца
console.log(str.slice(-2))    // скопирует с -2-го до конца(вправо)
console.log(str)*/


//@ substr(start, length)
/*
console.log(str)
console.log(str.substr())                   // substr без аргументов скопирует всю строку
console.log(str.substr(2,4))    // скопирует со 2-го 4 символа
console.log(str.substr(2, -4))  // пустая строка, так как нельзя указывать длину с минусом
console.log(str.substr(-2, 4))  // скопирует с -2-го 4 символа (если нет 4-x скопирует сколько есть)
console.log(str.substr(2))             // скопирует со 2-го до конца
console.log(str.substr(-2))            // скопирует с -2-го до конца(вправо)
console.log(str)
*/

//@ substring(start, stop)
/*
console.log(str)
console.log(str.substring())        // substring без аргументов скопирует всю строку
console.log(str.substring(2, 4))    // скопирует со 2-го до 4
console.log(str.substring(2, -4))   // скопирует с 0-го до 2 (отрицательные индексы превращает в ноль и 0 поменяет местами с 2-ой)
console.log(str.substring(-2, 4))   // скопирует с 0-го до 4-го
console.log(str.substring(2))       // скопирует со 2-го до конца
console.log(str.substring(-2))       // скопирует всю строку, так как -2 превратит в 0
console.log(str)*/

/*
//@toLowerCase/toUpperCase
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
 */

/*
//@str.indexOf(substr, pos) -  ищет подстроку substr в строке str, начиная с позиции pos, и возвращает позицию,
//           на которой располагается совпадение, либо -1 при отсутствии совпадений.
 */

/*
//@str.includes(substr, pos) возвращает true, если в строке str есть подстрока substr, либо false, если нет
*/

//@str.trim() - удаляет пробельные символы в начале и конце строки
// str.trimLeft() - удаляет пробелы в начале строки
// str.trimRight() - удаляет пробелы в конце строки

//@Преобразование в строку JSON


//@работа с кодами (UTF-16 table)
let str = 'abcd'
console.log(str.charAt(1))     // вернет символ под индексом 0 в этой строке
console.log(str.charCodeAt(0)) // вернет код символа под индексом 0 в этой строке
console.log(String.fromCharCode(65, 66, 67)) //вернет строку из символов соответствующим кодам

/*
? 1) Есть специальные символы для форматирования текста внутри строк (например: \' и \n )
? 2) Что такое побитовый сдвиг? Побитовые операторы. (>>)
? 3) Что такое юникод?

*/

