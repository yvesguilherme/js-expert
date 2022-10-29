/**
 * 9999999999999999        = 10000000000000000
 * true + 2                = 3
 * '21' + true             = '21true'
 * '21' - true             = 20
 * '21' - - 1              = 22
 * 0.1 + 0.2 === 3         = false
 * 3 > 2 > 1               = false
 * 3 > 2 >= 1              = true
 * 'B' + 'a' + + 'a' + 'a' = BaNaNa
 */

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '' === '123', 'implicit convertion to string');
console.assert(('hello' || 123) === 'hello', '|| always returns the first element if both are true')
console.assert(('hello' && 123) === 123, '|| always returns the last element if both are true')

// --

const item = {
  name: 'Yves',
  age: 27,
  /**
   * String: 1 se não for primitivo, chama o valueOf
   */
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  /**
   * Number: 1 se não for primitivo, chama o toString
   */
  valueOf() {
    return { hey: 'dude' };
  },
  /**
   * Tem prioridade acima de todos
   */
  [Symbol.toPrimitive](coercionType) {
    // console.log('Trying to convert to', coercionType);
    const types = {
      string: JSON.stringify(this), // hash table
      number: '0007'
    };

    return types[coercionType] || types.string;
  }
};

// console.log('item valueOf', item + 0);
// console.log('item toString', ''.concat(item));

// console.log('\n\n');

// console.log('toString: ', String(item));
// Vai retornar NaN, pois o toString retornou a string.
// console.log('valueOf: ', Number(item));

// console.log('\n\n');

// depois de adicionar o toPrimitive
// console.log('String: ', String(item));
// console.log('Number: ', Number(item));
// chama a conversão default (boolean)
// console.log('Date: ', new Date(item));

console.assert(item + 0 === '{"name":"Yves","age":27}0');
// console.log('!!item is true?', !!item);

// console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === 'Ae{"name":"Yves","age":27}');

// console.log('implicit + explicit coercion (using ==)', item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: 'Zézin', age: 20 };
// console.log('New Object', item2);
console.assert(item2.name === 'Zézin' && item2.age === 20);