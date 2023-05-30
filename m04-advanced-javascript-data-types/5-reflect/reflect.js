'use strict';

const assert = require('assert');

/**
 * Garantir a semântica e segurança em objetos.
 */
// #### Apply

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
}

// Function.prototype.apply = () => console.log('Roubando dados...');
// Function.prototype.apply = () => { throw new TypeError('Eita!!!') };

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

/** Um problema que pode acontecer (raro). */
// Function.prototype.apply = () => {throw new TypeError('Eita!')};

/**
 * Um outro problema que pode acontecer (comum).
 * Colocando uma exceção dentro ou pegar os dados desse objeto (this),
 * toda vez que for alterado e jogar para uma outra função.
 */
myObj.add.apply = function () { throw new TypeError('Vixx...') };

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vixx...'
  }
);

/**
 * Usando o reflect:
 * Primeiro parâmetro = função que vai ser chamada;
 * Segundo parâmetro  = this (contexto que estará dentro da função);
 * Terceiro parâmetro = argumentos igual passava no apply.
*/
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// #### defineProperty
/** Utilizado mais para questões semânticas. */

function MyDate() { };

/**
 * Feio para caramba, tudo é Object, mas Object adicionando propriedades
 * para uma function?
 */
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there...' });

// Com reflect, agora faz mais sentido.
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey there...');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');

// #### defineProperty (ESQUECER E PARAR DE USAR O DELETE DO JS)
const withDelete = { user: 'Yves' };
// Imperformático, evitar ao máximo.
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const deleteWithReflection = { user: 'XuxaDaSilva' };
Reflect.deleteProperty(deleteWithReflection, 'user');
assert.deepStrictEqual(deleteWithReflection.hasOwnProperty('user'), false);

// #### get
/**
 * É também uma questão mais de semântica e também de tipo de dado.
 * Nós deveríamos fazer um get somente em instâncias de referência.
 */
assert.deepStrictEqual(1['userName'], undefined);

/** Com reflectio, uma exceção é lançada! */
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// #### has
/**
 * Usamos uma string seguido de IN para saber se aquela palavra é
 * uma chave de um objeto.
 */
assert.ok('superman' in { superman: 'Noob man' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));

// #### ownKeys
const user = Symbol('user');
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'yvesguilherme'
};

/**
 * Com os métodos de object, temos que fazer 2 requisições,
 * Para buscar os Symbols e os Objetos.
 */
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
];
// console.log('objectKeys', objectKeys);
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

/** Com reflection, só precisar utilizar um único método. */
// console.log('Reflect.ownKeys(databaseUser)', Reflect.ownKeys(databaseUser));
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);
