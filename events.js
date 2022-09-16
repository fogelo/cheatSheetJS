/*
* 1) Фаза погружения (capturing phase) (иногда называют фаза перехвата)
* 2) Фаза цели (target phase)
* 3) Фаза всплытия (bubbling stage)
*
*
* */


//§ всплытие и погружение

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



// addEventListener и removeEventListener
// здесь будет шпаргалка по событиям, погружение и всплытие, делегирование
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