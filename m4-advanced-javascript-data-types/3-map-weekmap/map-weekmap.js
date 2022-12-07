const assert = require('assert');

const myMap = new Map();

/**
 * Podem ter qualquer coisa como chave.
 */
myMap
  .set(1, 'one')
  .set('Yves', { text: 'two' })
  .set(true, () => 'hello world!');

/**
 * Usando um construtor
 */
const myMapWithConstructor = new Map([
  ['1', 'str'],
  [1, 'num1'],
  [true, 'bool1']
]);

console.log('myMap', myMap, '\n');
console.log('myMap.get(1)', myMap.get(1), '\n');
assert.deepStrictEqual(myMap.get('Yves'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello world!');

/**
 * Em objects a chave só pode ser string ou symbol
 * (number é coergido a string)
 */
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'Yves Guilherme' });
console.log('getWithoutReference', myMap.get({ id: 1 }), '\n'); // undefined, pois só funciona por referência.
console.log('getWithReference', myMap.get(onlyReferenceWorks), '\n');
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Yves Guilherme' });

/**
 * Utilitários
 * - No Object seria Object.keys({a: 1}).length
 * - No Map é apenas myMap.size
 */
assert.deepStrictEqual(myMap.size, 4);

/**
 * Para verificar se um item existe no objeto
 * - No Object:
 *   item.key = se não existe retorna undefined
 *   if() = faz a coerção implícita para boolean e retorna false.
 * - O jeito correto no Object seria:
 *   ({ name: 'Yves }).hasOwnProperty('name');
 *
 * - No map é apenas myMap.has('name');
 */
assert.ok(myMap.has(onlyReferenceWorks));

/**
 * Para remover um item do objeto
 *
 * - No Object é comum ser usado: delete item.id. Porém é imperformático para o JS.
 *
 * - No map é utilizado o método myMap.delete('name') e retorna um booleano se foi removido ou não.
 */
assert.ok(myMap.delete(onlyReferenceWorks));

/**
 * Não dá para iterar em Objects diretamente, mas:
 * - Dá para iterar com o for in, mas vai pegar o index que vai pegar a chave que vai retornar o valor;
 * - Para realmente pegar a chave e valor, utilizamos o Object.entries(item)
 *
 * - No map, ele implementa o padrão do generators, ou seja, podemos usar o spread operator.
 */
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Yves", { "text": "two" }], [true, null]]));

for (const [key, value] of myMap) {
  console.log({ key, value }, '\n');
}

/**
 * Object é inseguro, pois dependendo do nome da chave, pode substituir
 * algum comportamento padrão.
 *
 * ({ }).toString() === '[object Object]'
 * ({ toString: () => 'Hey' }).toString() === 'Hey'
 *
 * Qualquer chave pode colidir, com as propriedades herdadas do object, como,
 * constructor, toString, valueOf, etc.
 */
const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
};

/**
 * Não tem restrição de nome de chave
 */
myMap.set(actor);
assert.deepStrictEqual(myMap.has(actor), true);
assert.throws(() => myMap.get(actor).toString, TypeError);

/**
 * Não da pra limpar um Object sem reassiná-lo,
 * mas no Map conseguimos.
 */
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

console.log('\n### WeakMap', '\n');

/**
 * ### WeakMap
 *
 * - Pode ser coletado após perder as referências;
 * - Usado em casos bem específicos;
 * - Tem a maioria dos benefícios do Map, mas não é ITERÁVEL;
 * - Só as chaves de referência e que você já conheça;
 * - Mais leve, prevê o memory leak, porque depois que as instâncias
 * saem da memória, tudo é limpo!.
 */
const weakMap = new WeakMap();
const hero = { name: 'Flash' };
weakMap.set(hero);
weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);