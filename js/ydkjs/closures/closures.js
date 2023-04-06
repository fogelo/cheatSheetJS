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
/* function wait(message) {
    setTimeout(function timer() {
        console.log(message);
    }, 1000);
}
wait("Hello, closure!"); */
/* 
Мы берем внутренюю функцию timer и передаем ее в setTimeout. Функция timer имеет замыкание над областью видимости wait. Вследствие чего эта функци поддерживаие
и использует ссылку на переменную message. Область видимости wait не удаляется так как во внутренней реализации движка функция setTimeout сохраняет ссылку на 
timer. Работает аналогичным образом как и в примере 11.

Каждый раз когда вы передаете callback (функцию обратного вызова) к ней прилагается замыкание

*/

// @ Пример 13 - замыкание это или нет вот в чем вопрос.
/* var a = 2;
(function IIFE() {
    console.log(a);
})(); */
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
/* for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    }(i))
} */

/*
В консоль выведет 5 раз число 6. Так как по правилам работы областей видимости все 5 функций хотя и определяются отдельно при каждой итерации цикла,
замыкаются над одной общей глобальной облоастью видимости, которая на самом деле содержит только один экземпляр i.
*/

/* 
?паттерн Модуль js использующий замыкание
*/
/* {
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
} */

// или так
/* {
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
} */
/* 
CoolModule - функция должна быть вызвана для создания экземпляра модуля. Без выполнения внешней функции создание ее внутренней области видимости и замыканиий 
не произойдет.

*/

/* 
§ Динамическая область видимости

Динамическа область видимости является близким родственником механизма this. Механиз this отчасти напоминает динамическу область видимости.

Лексическая область видимости предоставляет набор правил, которыми движок руководствуется для поиска переменных и выбора мест в которых он их ищет.
Ключевая характеристки лексичесской области видимости - это ее определение на стадии написания кода.
Динамическая область видимости определяется во время выполнения - для нее не важно где объявлена функция,а важно лишь где она вызывается.

ЛВО - важно где функция объявлена
ДВО - важно где функция вызывается

Для this важно как была вызвана функция. То есть оно тоже определяется на стадии выполнения, это то что его роднит с ДВО.
*/

// @ Пример 15 - Отличие лексической области видимости от динамической. Что выведет и почему, а если var заменит на let или поменять var и bar местами?
/* {
    function foo() {
        console.log(a); // 2 - если область лексическая как в js, но будет 3 если бы была динамическа область видимости (то есть определялась на стадии выполнения)
    }
    function bar() {
        var a = 3;
        foo();
    }
    var a = 2;
    bar();
} */
/*
 Функция foo в случае с ЛОВ была определеная не внутри bar, соответственно когда движок будет выполнять код он переменную а будет искать в лексической 
 области видимости функции foo даже если выполняется внутри функции bar.
*/


/* 
§ Полифилы для блочной области видимости
*/
// @ Пример 17 - вот так работает try/catch
/* try {
    throw 2
} catch (a) {
    console.log(a)
} */
/* 
Что здесь происходит, throw приндительно инициирует ошибку, но эта ошибка обычное значение 2 затем вызывается catch в котрой переменной а присваивает
значение того что выкинул throw.
*/

// @ Пример 18 - что выведет и почему?
/* const b = 3
console.log(b)
try {
    b = 5
    console.log(b)
} catch (err) {
    console.dir(err)
} */


// @ Пример 19 - Что делать если захочется использовать блочную область видимости до ES6. 

// вот так после ES6
/* {
    let a = 2;
    console.log(a); // 2
}

console.log( a ); // ReferenceError */
// а вот так до ES6
/* try{throw 2}catch(a){
    console.log( a ); // 2
}
console.log( a ); // ReferenceError */

/* Да, секция catch действительно обладает блочной областью ви- димости, а следовательно,
 может использоваться в качестве по- лифила для блочной области видимости в средах до ES6. */


/* 

§ лексическое this
This теряется потому-что ему важно как вызвается функция,а не где объявляется.
В ES6 повявились стрелочные функции. Стрелочная функция  - вводит новое поведение, называемое лексическое this.
Стрелочные функции используют значение this своей лексической внешней области. То есть например стрелочная функция объявлена в глобально ОВ, то лексическая 
область видимости и будет глобальная ОВ, а this в глобальной ОВ ссылается на window.
*/

// @ Пример 20 - что выведет и почему? 
/* function aaa() {
    console.log(this)
}
const bbb = () => {
    console.log(this)
}
aaa()
bbb() */


// @ Пример 21 - что выведет и почему?  Проблема связывания this c функцией cool. Отличие в поведение стрелочных и обычных функций.

/* let obj = {
    id: 1,
    regularF: function () {
        console.log(this.id);
        const arrowInnerF = () => {
            console.log(this.id);
        }
        arrowInnerF()
    },
    arrowF: () => {
        console.log(this.id);
    }
};
var id = 2; // а если var заменить на let
obj.regularF();
setTimeout(obj.regularF, 0);

obj.arrowF();
setTimeout(obj.arrowF, 0); */

/*
Если var id, то порядок выполнения этого кода будет следущим:
regularF поднимаются наверх. Объявление var id поднимется наверх, затем начнется выполнени. Выполнится команда id = 2. Затемы вызов obj.regularF, внутри нее используется this.
Этот this будет ссылкой на obj. А у obj есть своя переменная id. Значит выведет в консоль число 1. Далее мы вызываем setTitmeout, который потом вызовет
obj.regularF. Теперь this будет ссылкой на window у которого есть переменная id (так как var цепляется к window в отличие от let).
Далее мы вызываем obj.arrowF(). Внутри нее есть this. но в случае со стрелочными функциями куда будет вести ссылка this зависит от того где эта ст. функция
была объявлена. В данном случае она была объявлена глобально, поэтому this = window. Значит выведет 2. Вслучае когда мы передаем arrowF в setTimeout тоже вывдет 2,
так как она потом вызвывается в рамках window.


Если let id. let не цепляется к window, и значит выведт соответствующие значения.
*/

/*

§this и прототипы объектов


this - специальный индентификатор,которые автоматически определяется в области видимости каждой функции.
this внутри функции это оъект в рамках которого вызвана функция. this можно управлять при помощи методов функций call, apply, bind.
Связывание this осуществляется не во время компиляции,а во время выполнения.

При вызове функции создается запись активации, также называемая контекстом выполнения. Эта запись содержит информацию о том откуда была
вызвана функция (стек вызовов), как она была вызвана, какие параметры были ей переданы при вызове и тд. Одним из  свойств этой записи является ссылка this,
которая используется на протяжении выполнения функции.

this не является ссылкой на саму функцию и не является ссылкой на лексическую область видимости функ- ции. this зависит только от способа вызова функции
*/


// @ Пример 22 - этот пример демонстрирует необходимость и пользу this.

// не используя this 
/* let me = {
    name: "anton"
}
let you = {
    name: "mary"
}
function identify(context) {
    return context.name.toUpperCase();
}
function speak(context) {
    var greeting = "Hello, I'm " + identify( context );
    console.log( greeting );
}
speak( me );
speak( you ); */

// а теперь используя this 
/* function identify () {
    return this.name.toUpperCase()
}
function speak () {
    var greeting = "Hello I'm " + identify.call(this)
    console.log(greeting)
}

let me = {
    name: "anton"
}
let you = {
    name: "mary"
}

speak.call(me)
speak.call(you) */

/*
Этот фрагмент кода позволяет использовать фнукцию speak (и identify) для разных контекстных объектов (me и you).
*/


// @ Пример 23 - функция это объект и вот так можно посчитать сколько раз она была вызвана.
// без использования this
/* function foo () {
    foo.count++
}
foo.count = 0
foo()
foo()
foo()
console.log(foo.count) */

// а теперь с использованием this
/* function foo () {
    this.count++
}
foo.count = 0
foo.call(foo)
foo.call(foo)
foo.call(foo)
console.log(foo.count) */

// @ Пример 24 - что выведет и почему?
/* function aaa() {
    bbb()
}
function bbb() {
    console.log(this);
}
aaa() */

// @ Пример 25 - что выведет и почему?
/* function foo() {
    console.log( this.a );
}
var obj2 = {
    a: 42,
foo: foo };
var obj1 = {
    a: 2,
obj2: obj2 };
obj1.obj2.foo(); */

/*
важен только верхний/последний уровень це- почки ссылок на свойства объекта
*/
// @ Пример 26 - что выведет и почему?
/* function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // Ссылка на функцию/синоним!
var a = "oops, global";
bar();  */


// @ Пример 27 - что выведет и почему?
/* function foo() {
    console.log( this.a );
}
function doFoo(fn) {
    // `fn` - просто еще одна ссылка на `foo`
    fn(); // <-- место вызова!
}
var obj = {
    a: 2,
foo: foo };
var a = "oops, global";
doFoo( obj.foo );  */

/*
Передача параметров — всего лишь неявное присваивание, а по- скольку мы передаем функцию,
происходит неявное присваивание ссылки, поэтому конечный результат будет таким же, как в пре- дыдущем фрагменте.
*/

// 
/* function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
a = "oops, global"
setTimeout(obj.foo, 100);  */

/*
Будет тоже самое будто бы мы вызвали foo рукми, поэтому будет this ссылать на window. setTimeout это просто функция, которая вызывает функцию, вот как
она выглядела бы если бы мы писали ее сами

function setTimeout(fn,delay) {
    // Сделать паузу продолжительностью `delay` миллисекунд
    fn(); // <-- место вызова!
}

*/

/*
Явное связываение this. call, apply, bind.
Если передать простое примитивное значение (типа string, boolean или number) для связывания this, это примитивное значение будет преобразовано
в объектную форму (new String(..), new Boolean(..) или new Number(..) соответственно). Часто это преобразование называется упаковкой (boxing).
*/
// @ Пример 28 - методы такие как  forEach тоже как и call, apply, bind умеют привязвать this ( внутри у них тоже навреняка call, apply или bind)
/* function foo(el) {
    console.log(el, this.id);
}
var obj = {
    id: "awesome"
};
// Использовать `obj` как `this` для вызовов `foo(..)`
[1, 2, 3].forEach(foo, obj); */

/*
§ new
Когда функция вызывается после оператора new (такие вызовы называются вызовами-конструкторами), автоматически выпол- няются следующие действия:
1. Создается (конструируется) новый объект.
2. Производится связывание сконструированного объекта с [[Prototype]]. (var obj1 = Object.create(obj2) ? это вроде имеется ввиду)
3. Сконструированный объект назначается в качестве связывания this для этого вызова функции.
4. Если функция не возвращает свой альтернативный объект, вызов функции автоматически возвращает сконструирован- ный объект.
*/

/*
§ Определние this

Чтобы понять на какой объект ведет ссылка this ответь на эти вопросы (Этих правил придерживаются обычные функции, стрелочные не придерживаются этиъ правил)
1) Функция вазывана после оператора new (связывание new)? Если да,то this содержит новый сконструированный объект.
    var bar = new foo()
2) Функция вызвана с bind, call, apply (явное связывание)? Если да,то содержит явно заданный объект
    var bar = foo.call( obj2 )
3) Функция вызвана с контекстом (неявное связывание), также называемом объектом-владельцем или содержащим объектом. Если да, то содержит контекстный объект
    var bar = obj1.foo()
4) В остальных случая используется this по умолчанию (привязка по умолчанию). Если действует "use strict" выбирается undefined если нет, то window
    var bar = foo()

Вместо этих 4 правил, стрелочные функции принимают связывание this от внешней области видимости (функциональной или глобальной)

*/
// @ Пример 29 - демонстрация лексической области видимости стрелочной функции. Что выведет и почему?
/* function foo() {
    return (a) => {
        // `this` здесь лексически наследуется от `foo()`
        console.log(this.a);
    };
}
var obj1 = {
    a: 2
};
var obj2 = {
    a: 3
};
var bar = foo.call(obj1);
bar.call(obj2); // 2, не 3! */

/* 
Стрелочная функция, созданная в foo, лексически захватывает значение this функции foo на момент вызова. Так как foo была связана по this c obj1, 
bar (ссылка на возвращенную стреочную функцию) также будет связана по this c obj1. 

Лексическое связывание стрелочной функции не может быть переопределено (apply, call, bind, new не подействуют)
*/
// @ Пример 30 - самый распространенный сценарий использование стр. функций - это обратные вызовы. Что выведет и почему?
/* function foo() {
    setTimeout(() => {
        // `this` здесь лексически наследуется от `foo()`
        console.log( this.a );
    },100);
}
var obj = {
a: 2 };
foo.call( obj ); */


/* 
§Объекты

Объекты существуют двух формах: декларативной(литеральной) и сконструированной

Литеральный синтаксис
var myObj = {
    key: value
// ... };

Сконструированная форма
var myObj = new Object();
myObj.key = value;


В js есть примитивные типы и объекты. Есть несколько специальных объектных подтипов, которые обычно назвают встроенными объектсами. 
 String  Number  Boolean  Object  Function  Array   Date  RegExp  Error

Эти объекты в действительности представляют собой встроенные функции. Каждая может быть использована как конструктор (то есть вызываться с оператором new)


Функция - это обычный объект с добавленной семантикой вызова.

Циклы for..in рекомендуется ис- пользовать только с объектами

син- таксис for..of для перебора массивов (и объектов, если объект определяет собственный итератор):
*/


// @ Пример 31 - дескриптор, выводит объект с инфой о том,что можно с этим свойстовм делать 
/* var myObject = {
    a: 2
};
console.log(Object.getOwnPropertyDescriptor( myObject, "a" )); */

//@ Пример 32 - значения дескрипторов свойства можно менять
/* var myObject = {};
Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
} );
myObject.a; // 2 */
/* 
writable (возможность записи), enumerable (перечисляемость) и configurable (возмож- ность настройки).
*/

// @ Пример 33 - можно проверить, содержит ли объект некоторое свойство, не запрашивая значение этого свойства:
var myObject = {
    a: 2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false

/* 
Оператор in проверяет, присутствует ли заданное свойство в объ- екте или на одном из более высоких уровней обхода цепочки [[Prototype]] (см. главу 10).
 С другой стороны, hasOwnProperty(..) только проверяет, присутствует ли свойство в объекте myObject или нет, и не обращается к цепочке [[Prototype]]
*/
// ! Отличия let от var
// нельзя
/* let bar = 3
let bar = 5 */

// можно
/* var bar = 3
var bar = 5 */
//1. Если не указывать явно var, let или const, то переменноя объявится с помощью var
//2. let в отличие от var не поднимается вообще, она там где есть. Объявления var поднимается наверх области видмости функции.
//3. var и function цепляется к window, let не цепляется. 