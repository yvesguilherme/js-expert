const assert = require('assert');

const myObject = {};
const proxiedMyObject = new Proxy(myObject, {/*handler hooks*/ });

assert(myObject !== proxiedMyObject);

myObject.foo = true;
assert(proxiedMyObject.foo === true);

proxiedMyObject.bar = true;
assert(myObject.bar === true);

/**
 * ##################################################################
 */

// Here is a Proxy where we're defining the same behaviour as the default:
const proxy = new Proxy({}, {
  apply: Reflect.apply,
  construct: Reflect.construct,
  defineProperty: Reflect.defineProperty,
  getOwnPropertyDescriptor: Reflect.getOwnPropertyDescriptor,
  deleteProperty: Reflect.deleteProperty,
  getPrototypeOf: Reflect.getPrototypeOf,
  setPrototypeOf: Reflect.setPrototypeOf,
  isExtensible: Reflect.isExtensible,
  preventExtensions: Reflect.preventExtensions,
  get: Reflect.get,
  set: Reflect.set,
  has: Reflect.has,
  ownKeys: Reflect.ownKeys,
});

/**
 * ##################################################################
 */

function urlBuilder(domain) {
  let parts = [];
  const proxy = new Proxy(function () {
    const returnValue = domain + '/' + parts.join('/');
    parts = [];
    return returnValue;
  }, {
    has: function () {
      return true;
    },
    get: function (object, prop) {
      parts.push(prop);
      return proxy;
    },
  });
  return proxy;
}
const google = urlBuilder('http://google.com');
assert(google.search.products.bacon.and.eggs() === 'http://google.com/search/products/bacon/and/eggs');

/**
 * ##################################################################
 */

class Foo {
  constructor() {
    return new Proxy(this, {
      get: (object, property) => {
        if (Reflect.has(object, property)) {
          return Reflect.get(object, property);
        } else {
          return function methodMissing() {
            console.log('you called ' + property + ' but it doesn\'t exist!');
          }
        }
      }
    });
  }

  bar() {
    console.log('you called bar. Good job!');
  }
}

// function Foo() {
//   return new Proxy(this, {
//     get: (object, property) => {
//       if (Reflect.has(object, property)) {
//         return Reflect.get(object, property);
//       } else {
//         return function methodMissing() {
//           console.log('you called ' + property + ' but it doesn\'t exist!');
//         }
//       }
//     }
//   });
// }

// Foo.prototype.bar = () => {
//   console.log('you called bar. Good job!');
// }

Foo = new Foo();
Foo.bar();
//=> you called bar. Good job!

Foo.this_method_does_not_exist();
//=> you called this_method_does_not_exist but it doesn't exist

/**
 * ##################################################################
 */

const baseConvertor = new Proxy({}, {
  get: function baseConvert(object, methodName) {
    const methodParts = methodName.match(/base(\d+)toBase(\d+)/);
    const fromBase = methodParts && methodParts[1];
    const toBase = methodParts && methodParts[2];

    if (!methodParts || fromBase > 36 || toBase > 36 || fromBase < 2 || toBase < 2) {
      throw new Error('TypeError: baseConvertor' + methodName + ' is not a function');
    }

    return (fromString) => {
      return parseInt(fromString, fromBase).toString(toBase);
    }
  }
});

console.log('baseConvertor.base16toBase2("deadbeef")', baseConvertor.base16toBase2('deadbeef'));
//=> '11011110101011011011111011101111'

console.log(
  'baseConvertor.base2toBase16("11011110101011011011111011101111")',
  baseConvertor.base2toBase16('11011110101011011011111011101111')
);
//=> 'deadbeef'

/**
 * ##################################################################
 */

function RecordFinder(options) {
  return new Proxy({}, {
    get(object, methodName) {
      return function findProxy(...values) {
        const fields = methodName.match(new RegExp('findBy((?:And)?(' + options.columns.join('|') + '))+', 'i'));
        if (!fields) {
          throw new Error('TypeError: ' + methodName + ' is not a function');
        }
        let select = `SELECT * FROM ${options.table} WHERE`;
        fields.pop();
        for (const i in fields) {
          select += `${i === 0 ? '' : ' AND'} ${fields[i]}="${values[i]}"`;
        }
        return select;
      };
    }
  });
};

const exampleRecordFinder = new RecordFinder({
  table: 'foo',
  columns: ['firstName', 'lastName']
});

assert(exampleRecordFinder.findByFirstName('Keith'), 'SELECT * FROM WHERE firstName="Keith"');
assert(exampleRecordFinder.findByFirstNameAndLastName('Keith', 'Cirkel'), 'SELECT * FROM WHERE firstName="Keith"');

/**
 * ##################################################################
 */

const example = new Proxy({ foo: 1, bar: 2 }, {
  has: function () { return false; },
  ownKeys: function () { return []; },
  getOwnPropertyDescriptor: function () { return false; },
});
assert(example.foo === 1);
assert(example.bar === 2);
assert('foo' in example === false);
assert('bar' in example === false);
// assert(example.hasOwnProperty('foo') === false);
// assert(example.hasOwnProperty('bar') === false);
assert.deepEqual(Object.keys(example), [ ]);
assert.deepEqual(Object.getOwnPropertyNames(example), [ ]);