// pageX, pageY - координата 0,0 находится в левом верхнем углу страницы
// clientX, clientY - координата 0,0 находится в левом верхнем углу окна браузера (видимой области)

// clientWidth - ширина элемента до полосы прокрутки
// clientHeight - высота элемента

// window.innerWidth - ширина окна браузера (вместе с полосой прокрутки)
// window.innerHeight - высота окна браузера (вместе с полосой прокрутки)

// scrollWidth - ширина элемента
// scrollHeight - высота элемента

//для тегов html и боди scrollHeight, offsetHeight, clientHeight могут вести себя неккоректно поэтому обычно берут максимальное из них
let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);


// получение html элемента в переменную
const htmlElement = document.documentElement

//получение div элемента
const divOuter = document.querySelector(".div-outer")
const divInner = document.querySelector(".div-inner")
const divInnerInner = document.querySelector(".div-inner-inner")

const btn = document.querySelector(".btn-get")


//Получение прокрутки

//scrollLeft - прокрученные пиксели по горизонтали начиная слева
//scrollTop - прокрученные пиксели по вертикали начиная сверху
// для тега html(documentElement) могут в некоторых браузерах возникнуть косяки со scrollLeft и  scrollTop, но прокрученные пиксели можно еще получить так:
// window.pageXOffset - это смещение окна браузера (видимости) относительно начала страницы по оси X
// window.pageYOffset - это смещение окна браузера (видимости) отностительно начала страницы по оси Y

//Методы элементов для прокрутки

//htmlElement.scrollBy(0, 100) - прокрутка относительно текущего положения (при первой отрисовке dom не сработает, чтобы увидеть результат нужно повешать эту функцию на кнопку)
//htmlElement.scrollTo(pageX,pageY) - прокрутка до координат (относительно всей странцы)
//htmlElement.scrollIntoView({block: "start", inline: "nearest"}) - прокрутка чтобы элемент показался на странцие, есть разные опции как именно он должен оказаться на странице


//document.body.style.overflow = "hidden" - так можно запретить прокрутку окна
//document.body.style.overflow = "" - а так возобновить возможность прокрутки


//Внешние и внутренние метрикик элементов на странице

// divElement.offsetParent - родительский элемент относительно которго задано смещение этого div элемента
// divElement.offsetLeft - смещение div относительно левого края родительского элемента
// divElement.offsetTop - смещение div относительно верхнего края родительского элемента

// divElement.offsetWidth - ширина div (включает и полосу прокрутки и бордеры)
// divElement.offsetHeight - высота div

//divElement.clientTop - расстояние от внутренностей элемента до его границ (сверху)
//divElement.clientLeft - расстояние от внутренностей элемента до его границ (слева)


// divElement.clientWidth - ширина div (без полосы прокрутки и бордера)
// divElement.clientHeight - высота div

// divElement.scrollWidth - ширина div вместе с его прокручиваемой частью (без полосы прокрутки и бордера, )
// divElement.scrollHeight - высота div

//вот так можно получить координаты относительно окна браузера и размеры элемента
// console.log(divInnerInner.getBoundingClientRect())

//вот так можно найти элемент, которые попадает в заданные координаты
// console.log(document.elementFromPoint(100, 100))









/* ---- РЕЗЮМИРУЯ И ЗАКРЕПЛЯЯ----*/

// Если кратко то есть client, offset и scroll. Есть расстояния от и до (top и left) и размеры (width и height)


//СМЕЩЕНИЯ
//div.clientTop - это расстояине от внутренностей элемента до его границ (рамка+скролл)
//div.offsetTop - это расстояние от гранцы блока до его родительского элемента относительно которого он спозиционарован
//div.scrollTop - число пикселей которое было прокручено у элемента, которому было задано свойство overflow: scroll;
btn.addEventListener("click", () => {
    console.log(divOuter.scrollTop)
})

//РАЗМЕРЫ
//clientWidth - ширина без бордера и полосы прокрутки
//offsetWidth - ширна с бордером и полосой
//scrollWidth - ширна без бордери и полосы, но с прокручиваемой частью
console.log(divOuter.clientWidth)

//МЕТОДЫ ДЛЯ СКРОЛЛА
//scrollBy(x, y) - скролл относительно исходной позиции (есть разные опции)
//scrollTo(pageX, pageY) - скролл относительно абсолютной системы координат (есть разные опции)
//scrollIntoView({...}) - скролл до появления элемента в области видимости (есть разные опции)

//ПОЛУЧЕНИЕ РАЗМЕРОВ ЭЛЕМЕНТА
console.log(divOuter.getBoundingClientRect())