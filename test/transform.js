/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с глубокой вложенностью (более 2 уровней)', (assert) => {
        const originalObject = { a: { b: { c: { d: 5 } } } };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: { b: { c: { d: 10 } } } }, 'Должен пробраться на самую глубину объекта');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Корректно обрабатывает значение null', (assert) => {
        const originalObject = { a: 1, b: null };
        const transformFunction = (value) => value === null ? 'found null' : value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 'found null' }, 'Функция не должна падать при встрече с null');
    });

    QUnit.test('Не изменяет (не мутирует) исходный объект', (assert) => {
        const originalObject = { a: 1, b: { c: 2 } };
        const copy = { a: 1, b: { c: 2 } }; // Копия для сравнения
        
        transform(originalObject, (v) => v + 100);

        assert.deepEqual(originalObject, copy, 'Исходный объект должен остаться нетронутым (чистая функция)');
    });
    QUnit.test('Работает с разными типами данных (строки, булевы значения, undefined)', (assert) => {
        const originalObject = {
            name: 'ivan',
            active: true,
            data: undefined,
            age: 20
        };
        
        // cтроки в верхний регистр, числа +1, остальное - не трогаем
        const transformFunction = (value) => {
            if (typeof value === 'string') return value.toUpperCase();
            if (typeof value === 'number') return value + 1;
            return value;
        };

        const expected = {
            name: 'IVAN',
            active: true,
            data: undefined,
            age: 21
        };

        const result = transform(originalObject, transformFunction);
        assert.deepEqual(result, expected, 'Должен корректно обрабатывать строки, bool и undefined');
    });
});
