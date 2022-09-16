/*
* 1) Фаза погружения (capturing phase) (иногда называют фаза перехвата)
* 2) Фаза цели (target phase)
* 3) Фаза всплытия (bubbling stage)
*
*
* */


const elem = document.querySelectorAll(".test-bubbling")
for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", () => alert(`Погружение: ${elem[i].tagName}`), true)
    elem[i].addEventListener("click", () => alert(`Погружение: ${elem[i].tagName}`))

console.log(elem)

// addEventListener и removeEventListener
// здесь будет шпаргалка по событиям, погружение и всплытие, делегирование
// свойство target и currentTarget
// preventDefault, stopPropagation
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