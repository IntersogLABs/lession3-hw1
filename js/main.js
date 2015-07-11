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
	var result=[];
	for(var i=0,k=0;i<array.length;k++) {
	    result[k]=[];
		for(var j=0;j<size && i<array.length;j++,i++) {
			result[k].push(array[i]);
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
function flatten(arr) {
	var result=[],tmp;
	for(var i=0;i<arr.length;i++) {
		if(Array.isArray(arr[i])) {
			tmp=flatten(arr[i]);
			for(var j=0;j<tmp.length;j++) {
				result.push(tmp[j]);
			}
		}
		else {
		result.push(arr[i]);
		}
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
	var result=[];
	var args = Array.prototype.slice.call(arguments,0);
	for(var i=0;i<args[0].length;i++) {
		for(var j=0, len=args.length;j<len;j++) {
			if(args[j].indexOf(args[0][i])==-1 || result.indexOf(args[0][i])!=-1) {
				break;
			}
			if(j==len-1) {
				result.push(args[0][i]);
			}
		}
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
function remove(arr, predicate) {
	for(var i=0;i<arr.length;i++) {
		if(predicate(arr[i])) {
			arr.splice(i,1);
			i--;
		}
	}
	return arr;
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
function uniq(arr) {
	for(var i=0;i<arr.length-1;i++) {
		for(var j=i+1;j<arr.length;j++) {
			if(arr[i]==arr[j]) {
				arr.splice(j,1);
				j--;
			}
		}
	}
	return arr;
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
	var result=[];
	var args = Array.prototype.slice.call(arguments,0);
	for(var i=0;i<args.length;i++) {
		for(var j=0;j<args[i].length;j++) {
			if(result.indexOf(args[i][j])==-1) {
				result.push(args[i][j]);
			}
		}
	}
	return result;
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
	var result=[];
	var args = Array.prototype.slice.call(arguments,0);
	for(var i=0;i<args[0].length;i++) {
		result[i]=[];
		for(var j=0;j<args.length;j++) {
			result[i][j]=args[j][i];
		}
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