/**
 * chunk(array, size);
 *
 * Разделяет массив на куски по size элементов
 * В последнем куске может быть меньше элементов чем size
 *
 * @param {Array} Массив для обработки.
 * @param {number} Длина одного куска.
 * @returns {Array} массив, содержащий куски
 *
 * @example:
 * chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']]
 * chunk(['a', 'b', 'c', 'd'], 3); // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size) {
    if (!Array.isArray(array) || isNaN(size) || size <= 0) return [];
    if (array.length <= size) return array;

    var result = [];

    for (var i = 0; i < array.length; i+=size) {
        result.push(array.slice(i, i+size));
    }

    return result;
}


/**
 * flatten(array);
 *
 * Выравнивет вложенный массив в невложенный.
 * То есть в итоговом массиве других массивов быть не может
 *
 * @param {Array} Массив для обработки.
 * @returns {Array} Плоский массив
 *
 * @example:
 * flatten([1, [2, 3, [4]]]); // => [1, 2, 3, 4]
 */
function flatten(array) {
    if(!Array.isArray(array)) return [];

    var result = [];

    for (var i = 0; i < array.length; i++) {
        if(Array.isArray(array[i]))
            result = result.concat(flatten(array[i]));
        else result.push(array[i]);
    }
    return result;
}


/**
 * intersection(arr1, arr2, arr3, ...);
 *
 * Возвращает массив со значениями, встречающимися во всех входящих массивах
 *
 * @param {...Array} Массивы для обработки
 * @returns {Array} Массив-пересечение
 *
 * @example:
 * intersection([1, 2], [4, 2], [2, 1]) // → [2]
 */
function intersection() {
    if(arguments.length == 0) return [];
    for (var p = 0; p < arguments.length; p++)
        if(!Array.isArray(arguments[p])) return [];

    var params = Array.prototype.slice.call(arguments, 0);

    var result = [];
    var successSearch = false;

    for (var i = 0; i < params[0].length; i++) {
        for (var j = 1; j < params.length; j++) {
            if (params[j].indexOf(params[0][i]) == -1){
                successSearch = false;
                break;
            }
            else successSearch = true;
        }
        if(successSearch == true)
            result.push(params[0][i]);
    }
    return result;
}


/**
 * remove(array, predicate);
 *
 * Удаляет из массива все элементы, вызов предиката для которых возвращает true
 *
 * @param {Array} Массив для обработки
 * @param {Function} Предикат, принимает элемент массива, возвращает boolean
 * @returns {Array} Массив без удаленных элементов.
 *
 * @example:
 * remove([1, 2, 3, 4], function(n) {return n % 2 == 0}); // → [1, 3]
 */
/*
 * Функцию remove() реализовал в двух вариантах: через push() и через splice().
 * Функция, реализованная через push() называется remove(),
 * а реализованная через splice(), называется remove2().
 */
function remove(array, predicate) {
    if(!Array.isArray(array)) return [];
    if(typeof predicate != "function") return [];

    var result = [];

    for (var i = 0; i < array.length; i++) {
        if(predicate(array[i]) == false)
            result.push(array[i]);
    }
    return result;
}

function remove2(array, predicate){
    if(!Array.isArray(array)) return [];
    if(typeof predicate != "function") return [];

    var result = array.slice();

    for (var i = 0; i < result.length; i++) {
        if(predicate(result[i])){
            result.splice(i,1);
            i--;
        }
    }
    return result;
}


/**
 * uniq(array);
 *
 * Удаляет из массива повторенные элементы
 *
 * @param {Array} Массив для обработки
 * @returns {Array} Массив без удаленных элементов.
 *
 * @example:
 * uniq([2, 1, 2]) // → [2, 1]
 */
/*
 * Функцию uniq() реализовал в 3-х вариантах:
 * через push() – функция uniq();
 * через splice() - функция uniq2();
 * через использование объекта – функция uniq3().
 * В 3-м варианте используется свойство уникальности ключей объекта.
 * Значения, размещенные по ключам, в данном случае, не используются.
 * Недостаток такой реализации (через объект), состоит в том, что в выходном массиве
 * все элементы представлены в виде строк.
 */
function uniq(array){
    if(!Array.isArray(array)) return [];

    var result = [];

    for (var i = 0; i < array.length; i++) {
        if(result.indexOf(array[i]) == -1)
            result.push(array[i]);
    }
    return result;
}

function uniq2(array){
    if(!Array.isArray(array)) return [];

    var result = array.slice();

    for (var i = 0; i < result.length; i++) {
        if(result.indexOf(result[i], i+1) != -1){
            result.splice(i,1);
            i--;
        }
    }
    return result;
}

function uniq3(array){
    if(!Array.isArray(array)) return [];

    var tempObj = {};

    for (var i = 0; i < array.length; i++) {
        tempObj[array[i]] = true;
    }

    return Object.keys(tempObj);
}


/**
 * union(arr1, arr2, arr3, ...);
 *
 * Объединяет массивы, но не включая повторы элементов
 *
 * @param {...Array} Массивы для обработки
 * @returns {Array} Объединенный массив без повторов.
 *
 * @example:
 * union([1, 2], [4, 2], [2, 1]); // → [1, 2, 4]
 */
/*
 * Функцию union() реализовал в 2-х вариантах:
 * 1-й вариант union() – без использования реализованной ранее функции uniq();
 * 2-й вариант union2() – с использованием реализованной ранее функции uniq().
 */
function union(){
    if(arguments.length == 0) return [];
    for (var p = 0; p < arguments.length; p++)
        if(!Array.isArray(arguments[p])) return [];

    var result = [];

    for (var i = 0; i < arguments.length; i++)
        for (var j = 0; j < arguments[i].length; j++){
            if(result.indexOf(arguments[i][j]) == -1)
                result.push(arguments[i][j]);
        }
    return result;
}

function union2(){
    if(arguments.length == 0) return [];
    for (var p = 0; p < arguments.length; p++)
        if(!Array.isArray(arguments[p])) return [];

    var result = [];

    for (var i = 0; i < arguments.length; i++) {
        result = result.concat(arguments[i])
    }

    result = uniq(result);

    return result;
}


/**
 * zip(arr1, arr2, arr3, ...);
 *
 * Создает массив сгруппированных элементов, в котором первый массив - 
 * это массив первых элементов входящих массивов, и т.д.
 *
 * @param {...Array} Массивы для группировки
 * @returns {Array} Массив с перегруппированными массивами.
 *
 * @example:
 * zip(['fred', 'barney'], [30, 40], [true, false]); // → [['fred', 30, true], ['barney', 40, false]]
 */
/*
 * Поскольку в задании не было указано, что входные массивы функции zip()
 * обязательно должны иметь одинаковую размерность, я реализовал более общий случай.
 * Если входные массивы имеют различную размерность, то функция возвращает массив
 * с количеством элементов равным максимальной размерности среди входных массивов, т.е.
 * console.log(zip(['fred', 'barney', 'bill'], [30, 40], [true, false])); // =>
 * [['fred', 30, true], ['barney', 40, false], ['bill', undefined, undefined]]
 * Если же входные массивы имеют одинаковую размерность, то реализованная функция
 * будет работать, как показано в примере к заданию.
 * Указанную функцию zip() реализовал двумя способами: zip() и zip2().
 */
function zip(){
    if(arguments.length == 0) return [];
    for (var p = 0; p < arguments.length; p++)
        if(!Array.isArray(arguments[p])) return [];

    var result = [];
    var temp = [];
    var n = 0;
    var indexExists = false;

    do {
        indexExists = false;
        for (var i = 0; i < arguments.length; i++) {
            temp.push(arguments[i][n]);
            if(arguments[i][n] != undefined)
                indexExists = true;
        }
        if(indexExists == false) break;
        result.push(temp);
        temp = [];
        n++;
    }while(true);

    return result;
}

function zip2(){
    if(arguments.length == 0) return [];

    var maxIndex = 0;
    for (var p = 0; p < arguments.length; p++){
        if(!Array.isArray(arguments[p])) return [];
        if(arguments[p].length > maxIndex)
            maxIndex = arguments[p].length;
    }
    maxIndex--;

    var result = [];
    var temp = [];
    var n = 0;

    do {
        for (var i = 0; i < arguments.length; i++) {
            temp.push(arguments[i][n]);
        }
        result.push(temp);
        temp = [];
        n++;
    }while(n <= maxIndex);

    return result;
}



// Testing
console.log(
    "chunk        ",
    chunk([1,2,3,4], 2)
);

console.log(
    "flatten      ",
    flatten([1, [2, 3, [4]]])
);

console.log(
    "intersection ",
    intersection([1, 2], [4, 2], [2, 1]) 
);


console.log(
    "remove       ",
    remove([1, 2, 3, 4], function(n) {
        return n % 2 == 0
    })
);

console.log(
    "remove2       ",
    remove2([1, 2, 3, 4], function(n) {
        return n % 2 == 0
    })
);

console.log(
    "uniq         ",
    uniq([2, 1, 2]) 
);

console.log(
    "uniq2         ",
    uniq2([2, 1, 2])
);

console.log(
    "uniq3         ",
    uniq3([2, 1, 2])
);

console.log(
    "union        ",
    union([1, 2], [4, 2], [2, 1])
);

console.log(
    "union2        ",
    union2([1, 2], [4, 2], [2, 1])
);

console.log(
    "zip          ",
    zip(['fred', 'barney'], [30, 40], [true, false])
);

console.log(
    "zip2          ",
    zip2(['fred', 'barney'], [30, 40], [true, false])
);