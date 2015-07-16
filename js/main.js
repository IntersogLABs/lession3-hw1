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
  chunkArr = [];
  for(var i = 0; i < array.length; i+= size) {
    chunkArr.push(array.slice(i, i + size));
	}
	return chunkArr;
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
  var flatArr = [];
  for (var i = 0; i < array.length; i++) {
          if(Array.isArray(array[i])) {
            flatArr = flatArr.concat(flatten(array[i]));
          }
          else {
            flatArr.push(array[i]);
          }
  }
    return flatArr;
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
  var inArr = arguments[0];
    for (var i = 1; i < arguments.length; i++){
      for (var j = 0; j < inArr.length; j++){
  		  if (arguments[i].indexOf(inArr[j]) == -1){
  			  inArr.splice(j, 1);
  			}
  		}
  	}
  	return inArr;
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
  var newArr = [];
	for (var i = 0; i < array.length; i++){
		if (!predicate(array[i])){
			newArr.push(array[i]);
		}
	}
	return newArr;
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
  var uniqArr = [];
  for(var i = 0; i < array.length; i++) {
    if(uniqArr.indexOf(array[i]) == -1) {
  	  uniqArr.push(array[i]);
  	}
  }
  	return uniqArr;
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
   unitArr = [];
   for (var i = 0; i < arguments.length; i++) {
     unitArr = unitArr.concat(arguments[i])
     }
     unitArr = uniq(unitArr);
     return unitArr;
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
  var zipArr = [];
	var argsArr = Array.prototype.slice.call(arguments);
	for(var i = 0; i < argsArr[0].length; i++) {
		zipArr[i] = [];
		for(var j = 0; j < argsArr.length; j++) {
			zipArr[i][j] = argsArr[j][i];
		}
	}
	return zipArr;

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
