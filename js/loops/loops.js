//§ЦИКЛЫ

let arr = ['Брайт', 'Нюша', 'Хеппи']

//§1    for

/* 
console.log('======================= FOR =======================')

for (i = 0; i < arr.length; i++) {
    console.log(arr[i])
} 
*/

//§2    do...while

/* 
console.log('======================= DO...WHILE =======================')

let i = 0
do {
    console.log(arr[i])
    i++
} while (i < arr.length)
 */


//§3    while
/* 
console.log('======================= WHILE =======================')

let i = 0
while (i < arr.length) {
    console.log(arr[i])
    i++
} 
*/

//§4 Рекурсия

//@функция возводящая в степень с помощью цикла
function row(x, n) {
    let result = 1;
    // умножаем result на x n раз в цикле
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}

console.log(row(2, 4))


//@функция возводяща в степень с помощью рекурсии (глубина рекурсии в данном случае равна n)
function pow(x, n) {
    if (n === 1) {
        return x;
    } else {
        return x * pow(x, n - 1);
    }

}

console.log(pow(2, 3)); // 8

//@ функция factorial, которая вычисляет факториал числа

function factorial(x) {
    if (x === 1) {
        return x
    } else {
        return x * factorial(x - 1)
    }
}
//@ функция fibonacci_series, которая создает массив из чисел фибоначи

var fibonacci_series = function (n) {
    if (n===1) {
        return [0, 1];
    }  else  {
        let s = fibonacci_series(n - 1);
        s.push(s[s.length - 1] + s[s.length - 2]);
        return s;
    }
};
// const result = fibonacci_series(4)
// console.log(result)

//@ функция складывающая числа с применением Immediately-Invoked Function Expression (IIFE)

function sum(n) {
    (function sum2() {
        if (n === 11) {
            return
        }
        console.log(n)
        n++
        sum2()
    }())
}
sum(1)


//§ метод flat - раскукоживание массива
//@ функция flatDeep, которая раскукоживает массив

//так было на мозиле
/*function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
};*/

//так я переделал
function flatDeep(arr, d = 1) {
    if (d > 0) {
        return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
    }
}
//вот так переделал еще раз
function steamrollArray(arr) {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? steamrollArray(val) : val), [])
}
const result = steamrollArray([[["a"]], [["b"]]]);
console.log(result)



/*
? 1) Что такое метки? Какие есть? 
? 2) Что такое рекурсия?
? 3) Написать функцию, которая возводит в степень используя цикл и рекурсию самостоятельно
? 4) Что такое глубина рекурсии?

    * Случай когда функция вызывает сама себя
*/




console.log(11)