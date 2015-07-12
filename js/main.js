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
    var result=[], currentChunk=[];
    for (var i=0; i<array.length;) {
        currentChunk.push(array[i++]);
        if (!(i % size) || i==array.length) {
            result.push(currentChunk);
            currentChunk = [];
        }
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
function flatten(array, _flatarr) {
    if (_flatarr===undefined) {
        var _flatarr=[];
    }
    for (var i=0; i<array.length; i++) {
        if (Array.isArray(array[i])) {
            flatten(array[i], _flatarr);
        } else {
            _flatarr.push(array[i]);
        }
    }
    return _flatarr;
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
    var common = arguments[0], i, j;
    for (i=1; i<arguments.length; i++) {
        for (j=0; j<common.length; j++) {
            if (arguments[i].indexOf(common[j]) == -1) {
                common.splice(j--, 1);
            }
        }
    }
    return common;
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
function remove(array, predicate) {
    for (var i=0; i<array.length; i++) {
        if (predicate(array[i])) {
            array.splice(i--, 1);
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
function uniq(array) {
    var repeatPos;
    for (var i=0; i<array.length; i++) {
        while ((repeatPos = array.indexOf(array[i], i+1)) > -1) {
            array.splice(repeatPos, 1);
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
function union() {
    var unionArr = arguments[0], i, j;
    for (i=1; i<arguments.length; i++) {
        for (j=0; j<arguments[i].length; j++) {
            if (unionArr.indexOf(arguments[i][j]) == -1) {
                unionArr.push(arguments[i][j]);
            }
        }
    }
    return unionArr;
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
function zip() {
    var i, j, transp = [];
    for (i=0; i<arguments[0].length; i++) {
        transp.push([]);
    }
    for (i=0; i<arguments.length; i++) {
        for (j=0; j<arguments[i].length; j++) {
            transp[j].push(arguments[i][j]);
        }
    }
    return transp;
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
