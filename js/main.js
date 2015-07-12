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
    var result = [];
    for (var i = 0; i < array.length/size; i++) {
        result.push(array.slice(i*size, (i+1)*size));
    };
    return result;
}
//  Test
//arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//chunk(arr, 3);  // => [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]



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
    var result = [];

    for (var nameOfField in array){
        if (Array.isArray(array[nameOfField])) {
            result = result.concat( flatten(array[nameOfField]) );
        }
        else {
            result = result.concat(array[nameOfField]);
        }
    }

    return result;
}
// Test
//var arr = [1,2,[3,[4,5,6,[7,8,[9]]]]];
//flatten(arr);   //  =>  [1, 2, 3, 4, 5, 6, 7, 8, 9]



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
    var result = [];
    var counter = 0;

    var find = function findArrayElement(array, e){
        var i = array.indexOf(e)
        if (i >= 0 && i < array.length) {return true;}
        return false;
    }
    
    for (var j = 0; j < arguments[0].length; j++) {    

        for (i = 1; i < arguments.length; i++) {
            if (find(arguments[i], arguments[0][j])) {
                counter++;
            }
        }

        if (counter == arguments.length - 1) result.push(arguments[0][j]);
        counter = 0;
    
    }
    return result;
}
// Test
// var arr1 = [1, 2, 4, 5, 6, 7, 8, 9];
// var arr2 = [0, 6, 5, 6, 7, 9];
// var arr3 = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
// intersection(arr1, arr2, arr3); //  =>  [5, 6, 7]



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
function remove(array, predicate) {
    var result = [];
    for (var id in array) {
        if (!predicate(array[id])) {
            result.push(array[id]);
        };
    }
    return result;
}
//  Test
//var arr3 = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
//function predicate(n) {return n % 2 == 0};
//remove(arr3, predicate);     //  => [1, 3, 5, 7, 11]



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
function uniq(array) {
    var result = [];

    var find = function findArrayElement(arr, item){
        var i = arr.indexOf(item)
        if (i >= 0 && i < arr.length) {return true;}
        return false;
    }

    for (var id in array) {
        if (!find(result, array[id])) {
            result.push(array[id]);
        };
    }
    return result;
}
//  Test
//var arr = [1, 2, 3, 4, 2, 3, 1, 2, 3, 1, 4, 2];
//uniq(arr);    // =>   [1, 2, 3, 4]



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
function union() {
    var result = [];
    for (var id in arguments) {
        result = result.concat(arguments[id]);
    }
    result = uniq(result);      // Result has been obtained ...

    var isNumberOnly = true;
    for (var id in result) {
        isNumberOnly = typeof result[id] === "number";
        if (!isNumberOnly) break;
    }                                                           
    var f;
    if(isNumberOnly) { f = function(a, b){ return a-b; } } ;
    return result.sort(f);      //  ... and sorted.
}
// Test 1
//var arr1 = [1, 2, 4, 5, 6, 7, 8, 9];
//var arr2 = [0, 6, 5, 6, 7, 9];
//var arr3 = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
//union(arr1, arr2, arr3);     // =>   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// Test 2
//var arr1 = ['a', 'w', '4', 'd', 's', '7', 'v', 'b'];
//var arr2 = ['d', 'w', 'v', 'n', '7', 'd'];
//var arr3 = ['w', 'd', '3', '4', 's', 'v', 'n', 'q', 'y', '7'];
//union(arr1, arr2, arr3);     // => ["3", "4", "7", "a", "b", "d", "n", "q", "s", "v", "w", "y"]
// Test 3
//var arr1 = ['a', 'w', '4', 'd', 's', 7, 'v', 'b'];
//var arr2 = ['d', 'w', 'v', 'n', '7', 'd'];
//var arr3 = ['w', 'd', 3, '4', 's', 'v', 'n', 'q', 'y', '7'];
//union(arr1, arr2, arr3);     // => [3, "4", 7, "7", "a", "b", "d", "n", "q", "s", "v", "w", "y"]



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
function zip() {
    var length = 0;   //  Length of the longest array.
    for (var id in arguments) {
        if(length < arguments[id].length){ length = arguments[id].length; }
    }

    var result = new Array(length);
        for (var j = 0; j < length; j++) {              
            result[j] = new Array(arguments.length);
        };

    for(var i=0; i<length; i++){
        for (var j = 0; j < arguments.length; j++) {
            result[i][j] = arguments[j][i];
        };
    }
    return result;
}
//  Test 1
//zip(['fred', 'barney'], [30, 40], [true, false]); // => [['fred', 30, true], ['barney', 40, false]]
//  Test 2
//zip(['fred', 'barney', 'joe', 'martin'], [30, 40, 20], [true, false, false, true])
// => [['fred', 30, true], ['barney', 40, false], ['joe', 20, false], ['martin', undefined, true]]


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