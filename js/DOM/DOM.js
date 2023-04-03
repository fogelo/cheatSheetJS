console.log('hello')
/*
                     § DOM - document object model (document и др ...)
§ WINDOW             § BOM - browser object model (navigator, location, history ...) - доп. объекты предоставляемые браузером чтобы работать
                        §со всем кроме документа
                     § JS - Javascript (Object, Array, Function ...)
*/

/*WINDOW*/
/*получение ширины окна браузера*/
const windowWidth = window.innerWidth;
console.log(windowWidth)
/*

§BOM
?объекты
* navigator - можно получить информацию о браузере и операционной системе
* location - можно получить текущий url адрес страницы, либо перенаправить пользователя на свой адрес
* history - позволяет управлять историей браузера и передвигаться по посещенным страницам
* */


/*
?еще есть свойства alert, confirm, prompt () - тоже часть BOM, но мы не можем влиять на стили этих диалоговых окон,
?поэтому они используются довольно редко
*/

//?alert
// alert('Привет')

//?confirm - можно получить результат в переменную (true или false)
/*const confirmResult = confirm('хочешь научиться верстать?')
console.log(confirmResult)*/

//?prompt - в переменную можно получить результат ввода в поле либо null если нажать отмена
/*const promptResult = prompt('кто ты по жизни?')
console.log(promptResult)*/


//§DOM
//В соответствии с объектной моделью документа все теги являются объектами, текст, а также комментарии тоже являются объектами
//абсолютно все эти объекты доступны нам из js и мы можем ими управлять

//теги становятся узлами объектами и формируют структуру DOM
// document точка входа в DOM, из него мы можем получить доступ к каждому узлу

//?самые верхние элементы дерева доступны как свойства объекта document
const htmlElement = document.documentElement
const headElement = document.head
const bodyElement = document.body
console.log(htmlElement)
console.log(headElement)
console.log(bodyElement)

//?получив body в переменную мы можем ее использовать как отправную точку для последующей навигации
//например можно получить первый и последний дочерние узлы
/*
* В документе, возможно, есть еще какой-то HTML-код, но на момент выполнения скрипта браузер еще до него не дошел.
* Поэтому следует размещать скрипт в самом конце документа
* */
const firstChildNode = bodyElement.firstChild
const lastChildNode = bodyElement.lastChild
console.log(firstChildNode) //здесь получим #text это первый узел (а первый узел это перенос строки)
console.log(lastChildNode)

//Коллекция childNodes содержит список всех детей, включая текстовые узлы
//childNodes похож на массив. На самом деле это не массив, а коллекция - особый перебираемый объект - псевдомассив
const childNodes = (bodyElement.childNodes)
console.log(childNodes)
console.log([])
/*
Отличие коллекции от массивов:
1. Для перебора коллекции мы можем использовать for...of
2. Методы массивов не будут работать, потому что коллекция - это не массив
 */
for (let node of childNodes) {
    console.log(node)
}


//? Живые коллекции
/*
Почти все DOM-коллекции, за небольшим исключением 'живые'. Другими словами, они отражают текущее состояние DOM.
Если мы сохраним ссылку на body.childNodes и добавим/удалим узлы в DOM, то они появятся в сохраненной коллекции автоматически
*/

//?Только для чтения
/*
DOM - коллекция, и даже более - все навигационные свойства, перечисленные далее, доступны только для чтения.
Мы не можем заменить один дочерний узел на другой, просто написав childNodes[i] = ...
Для изменения DOM требуются другие методы
*/

//? Соседние и родительские узлы
const previousSiblingNode = bodyElement.previousSibling
const nextSiblingNode = bodyElement.nextSibling
const parentNode = bodyElement.parentNode

console.log(previousSiblingNode)
console.log(nextSiblingNode)
console.log(parentNode)


//Коллекция элементов(тегов)
const bodyChildren = bodyElement.children
console.log(bodyChildren)

//первый и последний дочерние элементы
const firstChild = bodyElement.firstElementChild
const lastChild = bodyElement.lastElementChild
console.log(firstChild)
console.log(lastChild)

//соседние и родительский элементы
const previousSibling = bodyElement.previousElementSibling
const nextSibling = bodyElement.nextElementSibling
const parentElement = bodyElement.parentElement

console.log(previousSibling)
console.log(nextSibling)
console.log(parentElement)


//§ Поиск произвольного элемента

//?querySelectorAll (возвращает коллекцию(NodeList), но эта коллекция статичная, а не живая)
/*
* Самый универсальный метод поиска, он возвращает все элементы внутри удовлетворяющие переданному в него CSS селектору.
* Этом метод действительно мощный, потому что можно использовать любой CSS селектор
* */
//поиск по селектору класса
const elem1 = document.querySelectorAll('.lesson__list')

//поиск по селектору тега
const elem2 = document.querySelectorAll('li')

//поиск по смешанному селектору тега и класса
const elem3 = document.querySelectorAll('li.lesson__item-list')

//поиск по тегу первого уровня вложенности
const elem4 = document.querySelectorAll('.lesson__list>li')

//поиск по нескольким классам
const elem5 = document.querySelectorAll('.lesson__list, .lesson__text')

//поиск по вложенным классам
const elem6 = document.querySelectorAll('lesson__list .lesson__text')

//поиск по id
const elem7 = document.querySelectorAll('#listItem')

//поиск по атрибуту
const elem8 = document.querySelectorAll('[data-item]')

//поиск по атрибуту со значением
const elem9 = document.querySelectorAll('data-item="85"')

//получение конкретного элемента коллекции
const elem10 = document.querySelectorAll('li')
// console.log(elem9[2])

// коллекцию мы можем перебрать
for (const item of elem10) {
    console.log(item)
}
//несмотря на то, что коллекция это не массив мы можем использовать метод forEach
elem10.forEach(item => {
    console.log(item)
})

//искать можно не только в document
const subList = document.querySelectorAll('.lesson__sub-list')
const subItems = subList.querySelectorAll('li')

//? querySelector (возвращает первый элемент, соответствующий CSS селектору) такой же мощный как и querySelectorAll

// const elem11 = document.querySelectorAll('.lesson__list')[0]
const elem11 = document.querySelector('.lesson__list')

//? getElementById - вернет коллекцию
const elem12 = document.getElementById('listItem')

//? getElementsByTagName - вернет живую коллекцию
const elem13 = document.getElementsByTagName('li')

//? getElementsByClassName
const elem14 = document.getElementsByClassName('lesson__item-list')

//? getElementsByName - используется очень редко, ищет элементы по значению атрибута name
const elem15 = document.getElementsByTagName('list')

//? closest - ищет ближайшего предка, который соответствует селектору. Метод closest поднимается от элемента и проверяет
//? каждого из родителей.
const elem16 = document.querySelectorAll('.lesson__item-sub-list')
const parentList = elem16.closest('.lesson__list')

//? matches - ничего не ищет, а проверяет, удовлетворяет ли элемент селектору, и возвращает true или false
const elem17 = document.querySelectorAll('.lesson__item-list')
for (let elem of elem17) {
    if (elem.matches('[class$="lesson__item-list_red"]')) {
        console.log('красный')
    } else if (elem.matches('[class$="lesson__item-list_red"]')) {
        console.log('синий')
    }
}


//§ ИЗМЕНЕНИЕ ДОКУМЕНТА

//? innerHTML
const textElement1 = document.querySelectorAll('.lesson__text')
//получаем содержимое как есть вместе с HTML
const textElementContent1 = textElement1.innerHTML
//можно изменить содержимое объекта
textElement1.innerHTML = ''


//? outerHTML
const textElement2 = document.querySelectorAll('.lesson__text')
//получаем содержимое как есть вместе с HTML, а также сам элемент
const textElementContent2 = textElement2.outerHTML
//можно изменить содержимое объекта
textElement1.outerHTML = ''

//? textContent
const textElement3 = document.querySelectorAll('.lesson__text')
//получаем просто текст элемента
const textElementContent3 = textElement3.textContent
//можно изменить содержимое объекта
textElement3.textContent = ''

//? data - содержимое текстового узла/комментария
const textElement4 = document.querySelectorAll('.lesson__text')
const getComment = textElement3.nextSibling
console.log(getComment)
console.log(getComment.data)
//можно изменить содержимое объекта
getComment.data = ''

//§ создание элементов и узлов

//? создание нового элемента (тега)
const newElement1 = document.createElement('div')
//наполняем новый элемент
newElement1.innerHTML = ''

//? создание нового текстового узла
const newText = document.createTextNode('Привет!')

/*Созданные объекты находятся в константах, и не являются частью документа*/

//§ вставка элементов
//1.получаем объект
const textElement5 = document.querySelectorAll('.lesson__text')
//2. создание нового элемента (тега)
const newElement5 = document.createElement('div')
//3.наполняем новый элемент
newElement5.innerHTML = ''
//4.вставляем новый элемент
//before - перед объектом
textElement5.before(newElement5)
//after - после объекта
textElement5.after(newElement5)
//внутрь и в начало объекта
textElement5.prepend(newElement5)
//внутрь и в конец объекта
textElement5.append(newElement5)


//можно вставлять несколько элементов сразу
textElement5.append(newElement5, 'hello')

//? insertAdjacentHTML (есть аналогичные методы insertAdjacentText - вставляет текст, и insertAdjacentElement - вставляет элемент)
//? adjacent - примыкающий
//1.получаем объект
const textElement6 = document.querySelector('.lesson__text')
//2.вставляем текст, HTML, элемент
textElement6.insertAdjacentHTML('afterend', '<p>Учись<p/>')
/*
* первыйм параметром в insertAdjacentHTML передается позиция куда вставлять то, что передается вторым параметром
* 'beforebegin' - вставить html непосредственно перед textElement3
* 'afterbegin' - вставить html в начало textElement3
* 'beforeend' - вставить html в конец textElement3
* 'afterend' - вставить html непосредственно после textElement3
* */


//§ перенос элемента
/*
Мы можем вставлять не только новые узлы, но и переносить существующие. Все методы вставки автоматически удаляют узлы со старых мест
*/
//1. Получаем объект
const lessonBlock1 = document.querySelector('.lesson')
//2. Получаем объект
const title = document.querySelector('h3')
//3. Переносим title в конец блока lessonBlock
lessonBlock1.append(title)

//§ клонирование узлов
/*
Если нужен не перенос, а именно копия элемента
*/
//получаем
const textElement = document.querySelector('.lesson__text')
//клонирование без дочерних элементов
const cloneTextElement1 = textElement.cloneNode()
//глубокое клонирование вместе с содержимым
const cloneTextElement2 = textElement2.cloneNode(true)

const lessonBlock2 = document.querySelector('.lesson')
lessonBlock1.append(cloneTextElement2)

//§ удаление узлов
//получаем
const textElement7 = document.querySelector('.lesson__text')
//удаляем
textElement7.remove()


//§ УПРАВЛЕНИЕ КЛАССАМИ
/*
* Изменение класса является одним из наиболее часто используемых действий в javascript
*
* */

//? свойство className
//получаем
const element1 = document.querySelector('.lesson__item-list_red')
//получаем имена классов данного объекта
const elementClassName = element1.className
//перезаписываем имена классов
element1.className = 'red'

//? свойство classList - специальный объект с методами для добавления/удаление одного класса
//получаем
const element2 = document.querySelector('.lesson__item-list_red')

//добавить класс
element2.classList.add('active')
//удалить класс
element2.classList.remove('active')
//добавить класс, если его нет, а если есть удалить
element2.classList.toggle('active')
//проверка наличия класса, возвращает true/false
element2.classList.contains('active')

//classList является перебираемым, поэтому можно перечислить все классы при помощи for...of

for (let className of element2.classList) {
    console.log(className)
}

//§ УПРАВЛЕНИЕ СТИЛЯМИ

//? свойство style
//получаем
const element3 = document.querySelector('.lesson__item-list_red')
//задаем стили с помощью CSS свойста
element3.style.color = 'red'

//для свойств из нескольких слов используется camelCase

//получение значение свойства
//только если оно записано в атрибуте style
console.log(element3.style.marginBottom)

//если нужно сбросить свойство нужно просто присвоить ему пустую строку и оно полностью исчезнет
element3.style.marginBottom = ''

//? свойство style.cssText позволяет полностью перезаписать стили
//получаем
const element4 = document.querySelector('.lesson__item-list_red')
element4.style.cssText = `
    margin-bottom: 30px;
    color: red;
`;


//? Вычисление стилей. getComputedStyle(element, [pseudo]) - работает даже когда стили не заданы явно
//получаем
const element5 = document.querySelector('.lesson__item-list_red')
//вычисляем стиль элемента
const elementStyle = getComputedStyle(element5)
console.log(elementStyle.fontSize)
// так же можно получить стили псевдоэлемент нашего элемента
const elementBeforeStyle = getComputedStyle(element5, '::before')
console.log(elementBeforeStyle.backgroundColor)

/*
* Манипулировать свойствами style следует только в том случае если классы нам помочь не могут. Например, при изменении координатов
* объекта на лету.
* Одним словом, если мы можем возложить решение той или иной задачи на плечи CSS путем манипуляции с классами, то так и следует сделать
*
* */


//§ АТРИБУТЫ И СВОЙСТВА DOM ЭЛЕМЕНТОВ
/*
* У разных DOM элементов могут быть разные свойства. Например, у тега <a>, есть свойства, связанные со ссылками, а у тега
* <input> - свойства, связанные с полем ввода и т.д.
*
* В HTML у тегов могут быть атрибуты. Когда браузер парсит HTML, чтобы создать DOM объекты для тегов, он распознает стандартные атрибуты
* и создает DOM свойства для них.
*
* Каждый DOM узел принадлежит соответствующему встроенному классу.
*
* */
//? стандартные атрибуты
const link = document.querySelector('.lesson__link')
const input = document.querySelector('.lesson__input')
console.log(link.href)
console.log(input.value)
//получить список доступных свойств можно так
console.dir(link)

//? произвольные атрибуты

const lessonText = document.querySelector('.lesson__text')
//проверяем наличие атрибута
lessonText.hasAttribute('name')
//получаем значение атрибута
lessonText.getAttribute('name')
//устанавливаем значение атрибута
lessonText.setAttribute('name', 'value')
//удаляем атрибут
lessonText.removeAttribute('name')

//? нестандартные атрибуты, dataset
/*
* Все атрибуты, начинающиеся с префикса 'data-', зарезервированы для использования программистами.
* Они доступны в свойстве dataset.
*
* */
//получаем элемент
const lessonText2 = document.querySelector('.lesson__text')
//получаем data-атрибут
console.log(lessonText2.dataset.size) //в html это выгляди так data-size
//перезаписываем data-атрибут
lessonText2.dataset.size = '5810'
console.log(lessonText2.dataset.size)
//data-size-value
console.log(lessonText2.dataset.sizeValue)


//? полезные свойства
const link2 = document.querySelector('.lesson__link')
//получаем тег элемента
console.log(link2.tagName)
//скрыть или показать элемент
link.hidden = true;










/*
* Чем отличается живая коллекция от статичной? Живая содержит всегда актуальную информацию о DOM дереве и неважно когда мы
* ее например выводим в консоль, а для статичной важно.
* */



