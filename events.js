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
buttonClick.dispatchEvent(event) //вызовается обработчик который мы повешали на кнопку "кодом"

// event.isTrusted - для отличия событий порождаемых реальными действиями пользователся или генерируемые кодом


// какие бывают события и что с помощью них можно сделать
// свойство relatedTarget для mouseover/out, mouseenter/leave
//drag and drop события
//keydown и keyup


//все это можно почитать на learn js


/*
* Можно записывать что-то в event в одном обрадотчике и потом читать это в другом, по крайнем мере при всплытии
*
*
* */