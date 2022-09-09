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
    console.log(e.relatedTarget)
    console.log(this)
    window.open('https://javascript.info/')
}

function handlerDiv(e) {
    console.log('div')
    console.log(e.currentTarget)
    console.log(e.target)
    console.log(e.relatedTarget)
    console.log(this)
}

button.addEventListener('pointerdown', handlerButton)
div.addEventListener('pointerdown', handlerDiv)


