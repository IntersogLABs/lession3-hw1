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
function chunk(arr, size){
    var result = [];

    for(var i = 0; i < arr.length; i+=size){
        result.push( arr.slice(i, i + size) );
    }
    return result
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
function flatten(arr){
    var result = [];

    function concat(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (!Array.isArray(arr[i])) {
                result.push(arr[i]);
            } else {
                concat(arr[i]);
            }
        }
    }
    concat(arr);

    return result
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
function intersection(){
    var result = [],
    arrays = [].slice.call(arguments),
    firstArray = arrays[0],
        found = false;

    for (var i = 0; i < firstArray.length; i++) {
        for (var j = 1; j < arrays.length; j++) {
            if(arrays[j].indexOf(firstArray[i]) != -1){
                found = true;
            }else{
                found = false;
                break;
            }
        }
        if(found)result.push(firstArray[i]);
        found = false;
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
function remove(array, predicate){
    for (var i = 0; i < array.length; i++) {
        if( predicate(array[i]) ){
            array.splice(i--,1);
        }
    }
    return array;
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
function uniq(array){
    for (var i = 0; i < array.length; i++) {
       if( array.indexOf(array[i], i + 1) !== -1){
           array.splice(i--,1);
       }
    }
    return array;
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
function union(){
   var result = [],
       arrays = [].slice.call(arguments);

    arrays.forEach(function(arr){
       result = result.concat(arr);
    })
    return uniq(result);
}


/**
 * union(arr1, arr2, arr3, ...);
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
function zip(){
    var result = [],
        arrays = [].slice.call(arguments),
        group = 0;

    for (var i = 0; i < arrays[0].length; i++) {
        var tmp = [];
        for (var j = 0; j < arrays.length; j++) {
            tmp.push(arrays[j][group]);
        }
        result.push(tmp);
        group++;
    }
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
    "uniq         ",
    uniq([2, 1, 2]) 
);

console.log(
    "union        ",
    union([1, 2], [4, 2], [2, 1])
);

console.log(
    "zip          ",
    zip(['fred', 'barney'], [30, 40], [true, false])
);