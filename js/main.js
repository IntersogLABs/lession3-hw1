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
 var newArr = new Array();
 var count = 0;
	while(array.length > count){
	newArr.push( array.slice(count,count+size) );
	count += size;
	}
return newArr;
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
 var newArray = new Array();
flattenHelper(array,newArray);
return newArray
}

function flattenHelper(arr, newArray){
	for(var i = 0; i < arr.length; i++){
	  if(Array.isArray(arr[i])) {
		  flattenHelper(arr[i], newArray);} else
	  newArray.push(arr[i]);
	}
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
  var newArray = arguments;
  var arr = new Array();
  var bool = true;

	for (var i = 0; i < newArray[0].length; i++) {
	bool = true;
		for(var j = 0; j < newArray.length; j++) {
		  if (newArray[j].indexOf(newArray[0][i]) == -1) {
			bool = false;}
		}
		
	if (bool) arr.push(newArray[0][i])
	}
return arr
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
	for (var i = 0; i < array.length; i++) {
	 if ( predicate(array[i]) ) {
		array.splice(i, 1) 
		}
	}
return array
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
  array.sort( function(a, b) {return a - b} )
	for (var i = 0; i < array.length; i++) {
	 if (array[i + 1] && array[i] == array[i + 1]) {
	 array.splice(i, 1)
	 i--;
	 }
	}
return array
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
  var arrArg = arguments
  var generalArray = new Array()
	for(var i = 0; i < arrArg.length; i++) {
		for(var j = 0; j < arrArg[i].length; j++) {
		  generalArray.push(arrArg[i][j])
		}
	}
return uniq(generalArray)
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
  var arrArg = arguments
	for (var i = 1; arrArg[1], i < arrArg.length; i++) {
	 if (arrArg[0].length != arrArg[i].length) {
	   console.log("Arrays are different length!");
	   return;
	  }
	} 

newArray = new Array()
	for(var j = 0; j < arrArg[0].length; j++) {
	  var tempArray = new Array()
		for(var i = 0; i < arrArg.length; i++) {
		  tempArray.push(arrArg[i][j])
		}
	  newArray.push(tempArray)
	}
return newArray
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