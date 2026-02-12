/**
 * Функция, которая преобразует значения объекта с помощью переданной функции.
 * Если значение является объектом или массивом, оно обрабатывается рекурсивно.
 * 
 * @param {Object|Array} obj - Исходный объект или массив для преобразования
 * @param {Function} transformFn - Функция преобразования, применяемая к значениям
 * 
 * @example
 * // returns { a: 2, b: 4 }
 * transform({ a: 1, b: 2 }, x => x * 2);
 * 
 * @returns {Object|Array} Новый объект или массив с преобразованными значениями
 */
const transform = function(obj, transformFn) {
    // Проверяем, является ли obj массивом. 
    // Если да — создаем [], если нет — создаем {}.
    const result = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        const value = obj[key];
        // Проверяем, является ли значение объектом (массивы тоже сюда попадают)
        // и не является ли оно null
        if (typeof value === 'object' && value !== null) {
            // Рекурсивный вызов для вложенных объектов и массивов
            result[key] = transform(value, transformFn);
        } else {
            // Применяем функцию трансформации к примитивам
            result[key] = transformFn(value);
        }
    }

    return result;
};