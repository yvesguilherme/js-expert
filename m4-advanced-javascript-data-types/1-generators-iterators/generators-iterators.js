const assert = require('assert');

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* calculation(20, 10);
}

const generator = main();

// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log('Array from', Array.from(main()));
assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);

// ---- async iterators
const { readFile, stat, readdir } = require('fs/promises');

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve('Hey dude...');
}

// console.log('promisified', [...promisified()]);

// Promise
//   .all([...promisified()])
//   .then(results => console.log('promisified', results));

// ; (async () => {
//   for await (const item of promisified()) {
//     console.log('for await', item.toString());
//   }
// })();

async function* systemInfo() {
  const file = await readFile(__filename);
  yield {
    file: file.toString()
  };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

; (async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item);
  }
})();