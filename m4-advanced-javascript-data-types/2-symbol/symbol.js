const assert = require('assert');

// #### KEYS
/**
 * Criar uma chave única, onde temos a certeza que
 * ela é única em nível de referência de memória, cada
 * vez que chamamos o Symbol, ele cria um endereço
 * totalmente diferente.
 */
const uniqueKey = Symbol('username');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for symbol';

console.log('getting normal Objects - ', user.userName);

// Sempre será único em nível de endereço de memória.
console.log('getting normal Objects - ', user[Symbol('username')]);
console.log('getting normal Objects - ', user[uniqueKey]);

console.log('####### \n\n\n');

assert.deepStrictEqual(user.userName, 'value for normal Objects');

// Sempre será único em nível de endereço de memória.
assert.deepStrictEqual(user[Symbol('username')], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

/**
 * É difícil de pegar, mas não é um dado secreto!
 */
console.log('symbols', Object.getOwnPropertySymbols(user));
console.log('symbols', Object.getOwnPropertySymbols(user)[0]);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (nem existe no codebase do node)
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);
// #### /KEYS

console.log('####### \n\n\n');

// #### WELL KNOWN SYMBOLS
const obj = {
  // Iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove o último elemento do array e o retorna.
        value: this.items.pop()
      }
    }
  })
};

// Não seria uma forma legal para visualizar os dados.
for (const item of obj) {
  console.log('item', item);
}
console.log('Array from', Array.from(obj));
console.log('Rest/Spread', [...obj]);

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

console.log('####### \n\n\n');

const kItems = Symbol('kItems');
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') {
      throw new TypeError();
    }

    const items = this[kItems]
      .map(item => new Intl
        .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
        .format(item));

    return new Intl
      .ListFormat('pt-BR', { style: 'long', type: 'conjunction' })
      .format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?';
  }
}

// Lembrar que no JS o mês começa sempre no 0!
const myDate = new MyDate(
  [2020, '00', '01'], // yyyy-MM-dd
  [2018, '01', '02'], // yyyy-MM-dd
  [2022, 11, 25]
);

const expectedDates = [
  new Date(2020, '00', '01'),
  new Date(2018, '01', '02'),
  new Date(2022, 11, 25)
];

// console.log('myDate', myDate);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]');
// console.log('myDate + 1' , myDate + 1);
assert.throws(() => myDate + 1);

// Coerção explícita para chamar o toPrimitive
console.log('String(myDate)', String(myDate));
assert.deepStrictEqual(
  String(myDate), '01 de janeiro de 2020, 02 de fevereiro de 2018 e 25 de dezembro de 2022'
);

// Implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates);

/**
 * Por ter que usar uma Promise, temos que usar o await e por isso colocamos
 * dentro de uma closure.
 */
// ; (async () => {
//   for await (const item of myDate) {
//     console.log('asyncIterator', item);
//   }
// })();

; (async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();