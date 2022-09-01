//§Подебажить этот код так как делал Димыч


const FuncC = (number) => {
    let sum = 0
    for (let i = 0; i < 10; i++) {
        const newNumber = number * 10
        sum += newNumber
    }
    return sum
}

const FuncB = (number) => {
    const c = FuncC(number * 10)
    return c * 10
}

const FuncA = (number) => {
    FuncB(number + 12)
}

const result = FuncA(100)