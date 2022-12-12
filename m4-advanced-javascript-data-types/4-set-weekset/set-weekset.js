const assert = require('assert');

/**
 * Usado na maioria das vezes para listas de itens únicos.
 */
const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);
console.log('arr3', arr3.sort(), '\n');
assert.deepEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));
console.log('Set with add item per item', set, '\n');
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

/** Maneira mais sênior utilizando rest/spread */
console.log('Set senior', Array.from(new Set([...arr1, ...arr2])), '\n');
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

/** Métodos */
console.log('set.keys', set.keys(), '\n');
console.log('set.values', set.values(), '\n'); // Só existe por conta do Map.

/**
 * No array comum, para saber se um item existe utilizamos:
 * [].indexOf('1') !== -1 ou [].includes(0);
 *
 * No set utilizamos o has, igual no Map.
 */
assert.ok(set.has('3'));

/**
 * Mesma teoria do Map, porém você sempre trabalha com a lista toda.
 * Não tem get, então você pode saber se o item está ou não no array e é isso.
 * Na documentação tem exemplos sobre como fazer uma interceção, saber o que tem em
 * uma lista e não tem na outra e assim por diante...
 */

/** Tem nos dois arrays */
const users01 = new Set([
  'yves',
  'mariazinha',
  'gabi'
]);

const users02 = new Set([
  'guilherme',
  'gabi',
  'jaum'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
console.log('intersection', intersection, '\n');
assert.deepStrictEqual(Array.from(intersection), ['gabi']);

/** O que não tem nos dois arrays */
const difference = new Set([...users01].filter(user => !users02.has(user)));
console.log('difference', difference, '\n');
assert.deepStrictEqual(Array.from(difference), ['yves', 'mariazinha']);

/**
 * ### weakSet
 *
 * Mesma ideia do weakMap.
 * - Não é enumerável (iterável);
 * - Só trabalha com chaves como referência;
 * - Só tem métodos simples.
 */
const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user2);
weakSet.has(user2);