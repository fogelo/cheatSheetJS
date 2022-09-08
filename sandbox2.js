const button = document.querySelector('.button')
const div = document.querySelector('.div')


// const handler = (e) => {
//     console.log(this)
//     console.log(e.currentTarget)
// }

function handlerButton(e) {
    console.log('button')
    console.log(e.currentTarget)
    console.log(e.target)
    console.log(this)
}

function handlerDiv(e) {
    console.log('div')
    console.log(e.currentTarget)
    console.log(e.target)
    console.log(this)
}

button.addEventListener('click', handlerButton)
div.addEventListener('click', handlerDiv)


