//§ Объект Math 

Math.sign(-8)       //-1    // если положительное 1, если отрицательное вернет  -1
Math.floor(45.95)   //46    // округлит в меньшую сторону       //floor - пол
Math.round(7.4)     //7     // округлит число к ближайшему целому
Math.ceil(7.008)    //8     // округлит в большую сторону       //celling - потолок
Math.trunc(13.42)  //13     //обрежет все знаки после запятой   //truncate - обрезать 
Math.abs(-1)       //1      //вернет модуль числа
Math.max(...[-1, -2, 1])    //1     //вернет максимальное из чисел
Math.min(...[-1, -2, 1])    //-2    // вернет минимальное из чисел
Math.pow(7, 2)     //49       //возведет в степень
Math.sqrt(9)       //3        //вернет квадратный корень числа  //sqrt - от слов square root
Math.random()      //0.5879078144755989     //вернет случайное число от 0 до 1

parseInt('0011', 2) //3     //переведет '0011' из двоичной системы в десятчную и вернет


let numObj = 12345.6789;
numObj.toFixed();                   // Вернёт '12346': обратите внимание на округление, дробной части нет
numObj.toFixed(1);      // Вернёт '12345.7': обратите внимание на округление
numObj.toFixed(6);      // Вернёт '12345.678900': обратите внимание на дополнение нулями

//§ Регулярные выражения (обычное выражение), regular expression, regex

/*
//Регулярные выражения чувствительны к регистру
//Регулярные выражения нужны для поиска по тексту, для замены текст, для проверки что текст совпадает с неким шаблоном
//Можно использовать регулярные выражения для удобного редактирования текста
//Регулярные выражения можно использовать в условиях, которые проверяют корректно ли введн email например
. - найдет любой одиночный символ, кроме переноса строки
[] - найдет любой символ, которые в скобках   //// [Ii] - найдет либо i либо I // [a-d] - найдет любую букву в диапазоне от a до d // [0-9]
[^] - найдет любой символ кроме тех что в скобках    //// [^b] - найдет все символы кроме b  // ^[^b] - найдет строки начинающиеся с b
$ - найдет конец каждой строки
^ - найдет начало каждой строки  ////^T - найдет строки с большой буквы Т
\n - найдет перенос каждой строки
\d - найдет любую цифру ([0-9] - тоже самое ) //// \d\d\d - найдет 3 любых цифры 
\D - найдет все что угодно кроме цифр 
\s - найдет все пробелы 
\S - найдет все кроме пробелов
\w - найдет английскую букву или цифру или нижнее подчеркивание _ //// \w\w\w - найдет слово из 3 букв(цифр)   //// [A-Za-z0-9_] - аналог
\W - найдет символ, который не является ни буквой ни цифрой ни _                                               //// [^A-Za-z0-9_] = аналог
\b - найдет все границы слова //// \b...\b - 'найдет слово' из 3 букв(символов, цифр)
\B - найдет все не границы слова (' междубуквье')
\ - экранирование // .\ - найдет просто . а не любой символ
() - при помощи скобок можно объединять выражения в группы

@Опережающие и ретроспективные проверки
/q(?=u)/ - означает найди q если за ним следует u
/X(?!Y)/ - означает найди такой X за которым не следует Y
/(?<=Y)X/ - означает найди X при условии что перед ним есть Y
/(?<!Y)X/ - означает найди X перед которым не следует Y



//@Квантификация (позволяет не дублировать спецсимволы в регулярных выражениях)
{} - найдет несколько подряд символов ////  n{4} - найдет nnnn  // n{4,6} - найдет nnnn и nnnnn и nnnnnn // n{3,} - найдет от nnn до бесконечности n
* - найдет символ, символ встречается подряд от 0 раз и выше //// be* - найдет b и be и даже beeeeeeeeeeeeee
+ - найдет символ, символ встречается подряд от 1 раз и выше //// be+ - найдет be и даже beeeeeeeeeeeeee ////   be\+ - найдет be+ (экранирование символов от спецсиволов или наоборот)
? - найдет символ, символ встречается от 0 до 1 раза //// be? - найдет b и be


//@Комбинации символов
(\s|-) - найдет либо пробел либо дефис
*/

/* 
////Создание регулярного выражения через конструктор
// const regex = new RegExp('шаблон', 'флаги')

////Создание регулярного выражения черезе литерал 
// const regexp = /шаблон/флаги

/* 
//// Поиск в строке с помощью регулярного выражения (match)
const regexp = /\w\w\w\w/
const str = 'Привет меня name Антон, мне 30 лет'
const result = str.match(regexp)
console.log('result: ', result);
 */

//// создание массива из строки где в качестве разделителя регуглярное выражение (split)
// const str = '1, 1,  5   ,33,    4  ,   5'
// const regexp = /\s*,\s*/
// const result = str.split(regexp)
// console.log('result: ', result)

//// поиск позиции элемента (индекса с которого начинается искомое) с помощью регулярного выражения
/* const str = '.... телефон 12345. почта ....'
const regexp = /\d{5}/
const result = str.search(regexp)
console.log('result: ', result);  // 13 */ // если бы не нашел выдал бы -1


////@ флаги в регулярных выражениях
/* 
// g - глобальный поиск (т.е. находит не только одно совпадение, а все совпадения)
const str = 'a\nb'
const regexp = /./g // найдет и a и b в массиве, если флаг g убрать, то найдет только a
const result = str.match(regexp)
console.log('result: ', result);
 */

/* 
// s - позволяет искать переносы строки
const str = 'a\nb'
const regexp = new RegExp('.', 'gs') // создание регулярного выражения с помощью конструктора
const result = str.match(regexp)
console.log('result: ', result); 
*/

/* 
// i - позволяет искать независимо от регистра
// const str = 'Кот терракотового цвета кушает котлету'
// // const regexp = /кот/gi  //вернет массив из всех 'кот' (и подстроки тоже), независимо от регистра
// const regexp = /кот/i  //вернет строку 'Кот'
// const result = str.match(regexp)
// console.log('result: ', result);
//  */

//@ replace возвращает новый массив
//  str = str.replace(/\s/, '');

//@ test проверяет сопоставление регулярного выражения строке (если выражение 'выделит' строку вернет true если нет false)
//@ группировка с обратной связью \1 (можно запомнить от 1 до 9)
//@ в итоге как это работает. То что в скобках записывается в специальную ячейку памяти затем это можно использовать далее в
//@ регулярном выражении \1 соответствует тому символу который будет найден по выражению (\w)
//Например, регулярное выражение (та|ту)-\1 найдёт строку та-та или ту-ту, но пропустит строку та-ту.
//  /(\w).*\1/i.test(str)



//@ Опережающие и ретроспективные проверки
//@ это именно проверки.
let sampleWord = "astronaut";
let pwRegex = /(?=\w{6})(?=\w*\d{2})/; // это выражение можно прочитать так: после "ничего" есть 6 знаков \w подряд, если есть
// проверяем следующие скобки. После ничего есть сколько угодно знаков \w и 2 цифры подряд, если да то проверка пройдена
// и если проверка пройдена то метод test вернут true
let result = pwRegex.test(sampleWord);



//§ ЗАДАЧИ РЕШЕННЫЕ С ПОМОЩЬЮ РЕГУЛЯРОК
//оказывается в replace помимо того, что можно вторым параметром передавать на что заменить найденные элементы, можно еще
//передать в него функцию которая по очереди будет принимать в себя найденные элементы и что-то с ними сделать
//@ функция, которая делает каждую слово с заглавной буквы в строке
/*function titleCase(str) {
    return str
        .toLowerCase()
        .replace(/(^|\s)\S/g, found_item => found_item.toUpperCase());
}*/

//@ функция, которая делает из camelCase(и не только) spinalCase
/*function spinalCase(str) {
    // Create a variable for the white space and underscores.
    let regex = /\s+|_+/g;

    // Replace low-upper case to low-space-uppercase.
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");   //или так - str = str.replace(/([a-z])([A-Z])/g, item=>item.split('').join(' '));



    // Replace space and underscore with -
    return str.replace(regex, "-").toLowerCase();
}

// test here
const result = spinalCase('The_Andy_Griffith_Show');
console.log(result)*/

//§ РЕСУРСЫ
// https://regexr.com
// https://regex101.com