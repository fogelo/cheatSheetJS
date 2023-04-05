//§ Область видимости (scope) и замыкания (closures)

/* 
§Что такое область видимости? 
Одна из самых фундаментальных парадигм, практически всех языков программирования - это возможность хранения значений в переменных и возможность 
последующего их чтения и изменения. Возможность сохранения и чтения значений из переменных - то, что образует состояние программы. 
Включение переменных в программу поднимает самый интересный вопрос. Где размещаются эти переменные? Как наша программа находит их когда в 
них возникает надобность? 
? Область видимости (scope) - это набор правил для хранения переменных в определенном месте и их нахождения в будущем.
Но где и как задаются эти правила?

?Немного о компиляторах 
Перед выполнением исходный код (ваша программа) проходит через 3 основные фазы обработки, которые приближенно объединяются термином компиляция:
    1) Лексический анализ/Разбиение на токены (Lexing/Tokenizing) - разбиение последовательности симоволов исходного кода на осмысленные (с точки зрения языка фрагменты),
называемые токенами. Например var a = 2 разобъется на var, a, = и 2
    2) Разбор (Parsing) - преобразование потока (массива) токенов в дерево вложенных элементов (Abstract Syntax Tree)
    3) Генерация - преобразование AST в исполняемый код.


Для простоты будем считать, что любой фрагмент js кода должен компилироваться перед его выполненим. Компилятор берет программу var a = 2 сначала компилирует
ее, а потом сразу готовит ее к исполнению.

Участники обрабатывающие программу var a = 2:
    1) Движок - отвечает за всю компиляцию и выполнение.
    2) Компилятор - друг движка, который берет на себя черновую работу по разбору и генерированию кода
    3) Область видимости - друг, который собирает и ведет список всех объевленных идентификаторов (переменных) и устанавливает 
    строгий набор правил их доступности для кода, выполняемого в данный момент


var a = 2 - Движок здесь видит 2 команды, одну Компилятор выполняет во время компиляции, вторую Движок выполняет во время выполнения.

 ?Этапы процесс обратоботки программы var a = 2 Движком и другими компонентами: 
    1. Прежде всего компилятор проводит лексический анализ и разбирает программу на токены, которые потом затем разбираются в дерево (AST). 
    2. Генерирует код. 
       Не совсем точное описание кода c помощью псевдокода, который в итоге генерирует Компилятор: 
        "Выделить память для переменной, присвоить ей метку a, сохранить в этой переменной значение 2".

       Более точное описание:
            1) Обнаруживая var a, К обращает к ОВ, чтобы узнать существует ли переменная a в наборе этой конкретной ОВ. Если да, то К игнорирует объявлениеи 
            и двигается дальше иначе обращается к этой ОВ и просит завести(объявить) перменную а
            2) Компилятор генерирует код для последующего его выполнения Движком для обработки присваиваня a = 2. Код, выполняемый движком сначала спрашивает
            у ОВ доступна ли переменная a в наборе текущее ОВ. Если переменная доступна, то движок использует эту переменную если нет, то двигается дальше.
            Если движок в конечном итоге находит переменную он присваивает ей значение 2. Если нет движок поднимает тревогу и сообщает об ошибке. 

Подведм итог:
Для присваивания значения переменной выполняются 2 разных действия. Сначала компилятор объявляет переменную (если она не была объявлена) в текущей ОВ,
а затем при выполнении Движок ищет переменную в ОВ, и если переменная будет найдена присваивает ей значение, 
если не удается найти Движок обращает к следующей ОВ. Да, областей видимости несколько

Компилятор - объявляет. То есть объявление на стадии компиляции
Движок - присваивает. А присваивание на стадии выполнения


Типы поиска переменных Движком в ОВ. LHS-ссылки и RHS-ссылка
1) LHS (lefthand side) - левосторонний, пытается найти переменную-контейнер для присваивания
2) RHS (righthand side) - правосторонний, пытается найти переменную, чтобы получить значение


? Какие бывают ошибки?
1) ReferenceError - относится к проблемам при разрешении области видимости
2) TypeError - подразумевает, что разрешение области видимости прошло успешно, то есть было получено значение, но в коде совершена попытка выполнить с 
этим значением недопустимую операцию

?Итоги
Область видимости - набор правил где и как осуществляется поиск индентификатора (переменной). Поиск может выполнятся для цели присваивания ей значения(LHS)
или же для цели чтения ее значения (RHS)

Движок JS сначала компилирует код перед выполнением. При этом команда вида var a = 2; разбивается на 2 части:
1) Сначала var a для обьявления переменной в области видимости. Этот шаг выполняется перед выполнением кода
2) Потом a = 2 для поиска переменной (LHS-ссылка) и присваивания ей значения, если переменная будет успешно найдена


*/



/* 
§ Лексическая область видимости

ОВ - набор правил, управляющих тем как Движок ищет переменную по ее идентификатору и находит ее в текущей области видимости или любой из внешних областей 
видимости в которых она содержится 


Существет 2 основных модели работы области видимости:
1) Лексическая область видимости (lexical scope) - используется в подавляющем большинстве языков программирования
2) Динамическая область видимости - использвуется в некоторых (Bash, Perl)

Первая традиционная фаза работы стандартного компилятора называется лексически анализом (или разбиением на токены). Процесс лексичесеого анализа 
изучает последовательность символов исходного кода и назначает семантический смысл токенам в результате разборас учетом состояния. Именно этот фундамент закладывает
понимание что такое ЛОВ и откуда берется это название.
Лексической областью видимости называется область видимости определяемая на стадии лексического анализа. Другими словами ЛОВ определяется тем, где вы 
разместили переменные и блоки области видимости во время написания программы, и следовательно жестко фиксируется на момент обработки вашего кода лексическим 
анализатором.


Структура и относительное размещение пузырей областей видимости полностью объясняет движку где он должен искать переменную.

Неважно где и как вызывается функция. Ее лексическая область видимости определяется только тем где в исходном коде она была объявлена.

eval(str) - функция,которая получает строку и интерпретирует содержимое строки так,словно это реальный код в текущей точке программы. Иначе говоря мы можем
на программном уровне генерировать код внутри своей программы и выполнять сгенерированный код так словно мы сами его написали
*/


/* 
? ЗАДАЧКИ на что выведет и почему
*/

// @Пример 1
/* function foo(a) {
    console.log( a + b );
 }

var b = 2;
foo( 2 ); // 4 */

// @Пример 2
/* console.log(i)
for (let i=0; i<10; i++) {
    console.log( i );
}
console.log(i) */

// @ Пример 3 - eval без строго режима
/* function foo(str, a) {
    eval( str ); // изменение!
    console.log( a, b );
 }
var b = 2;
foo( "var b = 3;", 1 ); */

// @ Пример 4 - eval в строгом режиме
/* function foo(str) {
    "use strict";
    eval( str );
    console.log( a ); // ReferenceError: переменная a
   }
 foo( "var a = 2" ); */


/* 
§ Функциональные и блочные области видимости

 Область видимости состоит из пузырей. Каждый пузырь представляет собой нечто вроде контейнера, в котором объявляются идентификаторы (переменные и функции).
 Пузыри вложены друг в друга, причем эта вложенность определятся на стадии написания кода. 
 ? Но что именно создает новый пузырь?

 Каждая объявленная функция создает область видимости для себя. Если взять любой фрагмент кода и завернуть его в функцию, вы фактически скроете все внутрение
 объявления переменных и функций от внешней области видимости.

 Анонимные функции не удобны при отладке
*/

// @ Пример 5 - замещение переменной a и где будет видна функция foo?. Такое выражение вообще называется IIFE (Immediately Invoked Function Expression)
//  @ Немедленно вызываемое функциональное выражение
/* var a = 2;
(function foo(){
console.log(foo)
var a = 3;
     console.log( a ); // 3
})(); // <-- и это
console.log(foo)
console.log( a ); // 2 */

// @ Пример 6 - что выведет если поменять let на var и переместить let наверх блока?
/* {
    console.log(bar); // ReferenceError!
    let bar = 2;
} */


/* 
§ Уборка мусора

Полезность блочной области видимости связана с замыканием и уборкой мусора для освобождения памяти. Разделив кода на блочные области видимости можно
наглядно показать движку какие переменные хранить не обязательно. Если к блочной области видимости нет ссылки извне то уборщик мусора ее удалит

*/

/* 
§ Поднятие (hoisting)

Переменные присоединяются к различным уровням области видимости в зависимости от того где и как они объявляются.

*/

// @ Пример 7 - что выведет и почему?
/* a = 2;
var a;
console.log( a ); 

console.log( b );
var b = 2;
*/

/* 
Чтобы ответить на пример 7, нужно вспомнить что Движок в действительно компилирует js код перед его исполнением. В одной из фаз компиляции компилятор находит и
связывает все объявления с соответствующими областями видимости. Таким образом, лучше всего представить что все объявления переменных и функций обрабатываются 
до выполнения любой части вашего кода.

var a = 2  воспринимается js как 2 команды var a (объявление обрабатывается в фазе компиляции) и a = 2 (присваивание остается на своем месте до фазы исполнения). 

движок этот код видит 
console.log( a );
var a = 2;

вот так
var a;
console.log( a );
a = 2;

Поднимаются только объявления, а все присваивания и другая исполняемя логика остаются на своих местах

Объявление функции поднимается включает в себя и значение, тоесть ее тело. То есть функция поднимается вместе со своим телом в отличие от var.

Объявления функций поднимаются. Функциональные выражения — нет.
Сначала поднимаются функции потом переменные.

*/

// @ Пример 8 - что выведет и почему?
/* foo(); // 1
var foo;
function foo() {
    console.log( 1 );
}
foo = function() {
    console.log( 2 );
}; */

// @ Пример 9 - что выведет и почему?
/* foo(); // 3
function foo() {
    console.log( 1 );
}
var foo = function() {
    console.log( 2 );
};
function foo() {
    console.log( 3 );
}
foo() */


// @ Пример 10 - что выведет и почему?
/* console.log(a)
console.log(b)
console.log(c)
console.log(d)
{
console.log(a)
function a() {}
var b = 1
}
function c () {}
var d = 2 */

/* 
§ Замыкание области видимости (closure)

Замыкания возникают в результате написания кода полагающегося на лексическую область видимости.
Замыкание - это способность функции запоминать свою лексическоую область видимости и обращаться к ней даже тогда, когда функция выполняется вне своей лексической области 
видимости.

*/

// @ Пример 11 - что выведет и почему? bar() все еще содержит ссылку на область видмости в которой она была объявлена и эта ссылка называется замыканием
/* function foo() {
    var a = 2;
    function bar() {
        console.log( a );
}
return bar; }
var baz = foo(); 
baz(); // 2 -- Вы только что увидели замыкание. */

/* 
Функция bar() обладает доступом лексической области видимости к внутренней области видимости foo().
Функция bar() вызывается за пределами свой лексической области видимости. Замыкание позволяет функции продолжить обращаться к лексической области видимости, 
определенной на стадии написания программы.
*/


// @ Пример 12 - как работает замыкание в setTitmeout
function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 1000);
}
wait("Hello, closure!");
/* 
Мы берем внутренюю функцию timer и передаем ее в setTimeout. Функция timer имеет замыкание над областью видимости wait. Вследствие чего эта функци поддерживаие
и использует ссылку на переменную message. Область видимости wait не удаляется так как во внутренней реализации движка функция setTimeout сохраняет ссылку на 
timer. Работает аналогичным образом как и в примере 11.

Каждый раз когда вы передаете callback (функцию обратного вызова) к ней прилагается замыкание

*/

// @ Пример 13 - замыкание или нет вот в чем вопрос.
var a = 2;
(function IIFE() {
    console.log(a);
})();
/* 
Этот код работает, но он не является проявлением замыкания, так как функция IIFE не вызывается за пределами своей лексической области. 
Она вызвается прямо в той области в которой была объявлена. Переменная а находится посредством обычного поиска по лексической области, а не с использование 
замыкания. 
*/

// @ Пример 14 - Что выведет и почему? А что выведет если var заменить на let? А что если 1000 заменить на 0
/* for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
} */

// а так почему теперь работает как ожидалось?
/* for (var i = 1; i <= 5; i++) {
    (function () {
        var j = i
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    }())
} */
// или
for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    }(i))
}

/*
В консоль выведет 5 раз число 6. Так как по правилам работы областей видимости все 5 функций хотя и определяются отдельно при каждой итерации цикла,
замыкаются над одной общей глобальной облоастью видимости, которая на самом деле содержит только один экземпляр i.
*/

/* 
?паттерн Модуль js использующий замыкание
*/
{
function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log( something );
}
    function doAnother() {
        console.log( another.join( " ! " ) );
}
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
}

// или так
{
var foo = (function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log( something );
    }
    function doAnother() {
        console.log( another.join( " ! " ) );
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
})();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
}
/* 
CoolModule - функция должна быть вызвана для создания экземпляра модуля. Без выполнения внешней функции создание ее внутренней области видимости и замыканиий 
не произойдет.

*/


// ! Отличия let от var
// нельзя
/* let bar = 3
let bar = 5 */

// можно
/* var bar = 3
var bar = 5 */