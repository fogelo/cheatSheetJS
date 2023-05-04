/*?1 arguments*/

//можно по идее не указывать при обьявлении функции, что мы в нее передаем, а просто воспользоваться ключевым словом
//arguments, который будет представлять собой массивоподобную коллекцию
function useArgs() {
    console.log(arguments)
}

useArgs(1, 2, 3, 4, 'hello')


// не знал что можно сделать такой цикл с помощью объекта Date
function documentClickHandler() {
    console.log('CLICK!!!');
}
document.addEventListener('click', documentClickHandler);
function a() {
    const fiveSecondsLater = new Date().getTime() + 5000;
    while (new Date().getTime() < fiveSecondsLater) {}
}
a();


