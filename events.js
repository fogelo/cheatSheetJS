/*
* 1) Фаза погружения (capturing phase) (иногда называют фаза перехвата)
* 2) Фаза цели (target phase)
* 3) Фаза всплытия (bubbling stage)
*
*
* addEventListener и removeEventListener - добавление и удаление "обработчиков"
* */


//§ Всплытие и погружение(перехват)

const elem = document.querySelectorAll(".test-bubbling")

const alert1 = (e, i) => {
    alert(`Погружение: ${elem[i].tagName}`)

}
const alert2 = (e, i) => {
    alert(`Всплытие: ${elem[i].tagName}`)
    // e.stopPropagation() - остановит дальнейшее распространение события
    // e.stopImmediatePropagation() - остановит распространение дальнейшее распространение и обработку остальных событий на текущем элеменете
}


for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", (e) => alert1(e, i), true)
    elem[i].addEventListener("click", (e) => alert2(e, i))
    // e.target - самый глубокий элемент на котором произошло событие
    // e.currentTarget - элемент на котором в данный момент сработал обработчик (равен this)
}


//§ Делегирование событий
//Идея в том что если у нас много элементов события на которых нужно обрабатывать похожим образом, то вместо того чтобы назначать обработчик
//каждому элементу мы ставим один обработчик на их общего предка. Из него можно получить event.target понять на каком именно потомке
//произошло событие и обработать его


const table = document.querySelector(".table")

let prevTarget //для сохранения предыдущего элемента на который был target

const clickHandler = (e) => {
    const target = e.target

    if (target.tagName !== "TD") return

    if (prevTarget) {
        prevTarget.classList.remove("highlight")
    }

    target.classList.add("highlight")
    prevTarget = target

    //можно присваивать собственные атрибуты тегам, которые начинаются с data-  и они будут упакованы в объект dataset
    //можно в зависимости от того что указано в этих атрибутах придавать разное поведение элемента из обработчика
    //вообще их можно по разномы использовать делить элементы на типы по какому-то то признаку
    console.log(e.currentTarget.dataset)
}

table.addEventListener("click", clickHandler)


//§ Действия браузера по умолчанию
/*
* многие события автоматически влекут за собой дейсвия браузера
* например:
* 1) Клик по ссылке инициирует переход на новый URL
* 2) Нажатие на кнопке форме - собирает данные и инпутов и отправляет их на сервер
* 3) Зажатие кнопки мыши над текстом и ее движени в таком состояние инициирует выделение
*
* чтобы отменить стандартные методы браузера существует метод e.preventDefault()
*
* */


//contextmenu - событие при вызове контекстного меню в браузере, можно отменить конекстное меню и сделать что-то свое
document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    alert("hello")
})


//§ Генерация пользовательских событий
//Можно генерировать события из кода

//вешаем обработчик на событие клик (чтобы произошло пользователь должен кликнуть по кнопке)
const buttonClick = document.querySelector("#button-click")
buttonClick.addEventListener("click", () => alert("click"))

//генерируем событие кодом (чтобы произошло можно задиспачить этот event внутри какого-то условия)
let event = new Event("click")
// buttonClick.dispatchEvent(event) //вызовается обработчик который мы повешали на кнопку "кодом"

// event.isTrusted - для отличия событий порождаемых реальными действиями пользователся или генерируемые кодом


//§ События

//@ основные события мыши

/*
* 1) mousedown/mouseup - сработают и для левой и для правой кнопки мыши
* 2) mouseover/mouseout - курсор появляется на элементом и курсор уходит с элемента
*    - эти события особенные так как имеют дополнительное свойство e.relatedTarget
*    - e.target - это элемент на который перешел курсор, а e.relatedTarget - это элемент с которого курсор ушел (null означает что курсор пришел из-за пределов окна браузера)
* 3) mouseenter/mouseleave - тоже самое что и mouseover/mouseout только 2 отличия:
*    - не всплывают (а значит их нельзя делегировать)
*    - переходы внутри элемента, на его потомки и с них на него не считаются
* 4) mousemove - каждое движение мыши над элементом генерирует событие
*   - генерируется не накаждый пиксель, браузер переодически проверяет позицию курсора и генерирует событие
*   - поэтому если пользователь будет быстро двигать мышкой некоторые элементы dom могут быть пропущены
* 5) dblclick - двойной клик
* 6) contextmenu - вызывается при попытке открыть контекстное меню (обычно правая кнопка мыши)
* 7) copy - вызывается при попытке скопировать какой-то текст
*
* e.button - 0(лкм), 1(скм), 2(пкм)
*
* Модификаторы ctrl, shift, alt и meta:
* 1) e.shiftKey - shift
* 2) e.altKey - alt или opt на мак
* 3) e.ctrlKey - ctrl
* 4) e.metaKey - cmd на мак
*
* */

//вот так можно отключить возможность выделения текста на элементе
const selection = document.querySelector(".selection")

selection.addEventListener("mousedown", (e) => {
    e.preventDefault()
})

//@ drag and drop события

//dragstart и dragend - позволяют решать простые задачи. Например можно перетащить файл в браузер так, что js получит доступ к его содержимому
//mousedown, mousemove и mouseup - это основа drag and drop

const ball = document.querySelector(".ball")
const gate = document.querySelector(".football-gate")
let shiftX = 0
let shiftY = 0

const moveAt = (pageX, pageY) => {
    ball.style.left = pageX - shiftX + "px"
    ball.style.top = pageY - shiftY + "px"
}

function enterElement(elem) {
    elem.classList.add("droppable");
}

function leaveElement(elem) {
    elem.classList.remove("droppable");
}

// потенциальная цель переноса, над которой мы пролетаем прямо сейчас
let currentElement = null;

const onMouseMove = (e) => {
    moveAt(e.pageX, e.pageY)

    ball.hidden = true // скрываем ball, чтобы посмотреть что под ним
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY) //вернеть элемент под курсором с наибольшим z индексом
    ball.hidden = false; // возвращаем ball обратно

    // событие mousemove может произойти и когда указатель за пределами окна
    // если clientX/clientY за пределами окна, elementFromPoint вернёт null
    if (!elemBelow) return

    // потенциальные цели переноса помечены классом football-gate (может быть и другая логика)
    let gate = elemBelow.closest(".football-gate") //closest ищет ближайшего предка elemBelow (начиная с elemBelow) c переданным в качестве параметра селектором

    if (currentElement !== gate) { // условие true только когда мы первый раз залетели в область и когда мы с нее ушли
        // мы либо залетаем на цель, либо улетаем из неё
        // внимание: оба значения могут быть null
        //   currentElement=null,
        //     если мы были не над droppable до этого события (например, над пустым пространством)
        //   droppableBelow=null,
        //     если мы не над droppable именно сейчас, во время этого события

        if (currentElement) {
            // логика обработки процесса "вылета" из droppable (удаляем подсветку)
            leaveElement(currentElement);
        }
        currentElement = gate;
        if (currentElement) {
            // логика обработки процесса, когда мы "влетаем" в элемент droppable
            enterElement(currentElement);
        }
    }
}

ball.addEventListener("mousedown", (e) => {
    ball.style.position = "absolute"
    ball.style.zIndex = "1000"
    // document.body.append(ball) //вроде не обязательно

    shiftX = e.clientX - ball.getBoundingClientRect().left
    shiftY = e.clientY - ball.getBoundingClientRect().top

    document.addEventListener("mousemove", onMouseMove)
})

ball.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove))


ball.ondragstart = () => false //отключение собственного drag and drop браузера


//@  события клавиатуры keydown и keyup

/*
* 1) keydown/keyup - события при нажатии клавиши и отпускании клавиши
*   e.code - "физический код клавиши"  // KeyZ (всегда одинаков для одной и той же клавиши)
*   e.key - символ которые напечатали // z или Z (в зависимости от регистра), z или я (в зависимости от языка)
* */


//все это можно почитать на learn js


/*
* Можно записывать что-то в event в одном обрадотчике и потом читать это в другом, по крайнем мере при всплытии
*
*
* */