import Benchmark from 'benchmark';

import CartIdOld from './cart-id-old.js';
import CartIdNew from './cart-id-new.js';
import CartRmOld from './cart-rm-prop-old.js';
import CartRmNew from './cart-rm-prop-new.js';
import CartPriceOld from './cart-price-old.js';
import CartPriceNew from './cart-price-new.js';
import database from '../database.js';

const suiteBenchmark = new Benchmark.Suite;

// suiteBenchmark
//   .add('Cart#cartIdUUID', function () {
//     new CartIdOld()
//   })
//   .add('Cart#cartIdCrypto', function () {
//     new CartIdNew()
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run();

// const data = {
//   products: [
//     {
//       id: 'ae',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123
//     },
//     {
//       id: 'ae2',
//       n: undefined,
//       abc: undefined,
//       a: null,
//       b: 123
//     }
//   ]
// };

// suiteBenchmark
//   .add('Cart#cartRmOld', function () {
//     new CartRmOld(data)
//   })
//   .add('Cart#carRmNew', function () {
//     new CartRmNew(data)
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//   })
//   .run({ async: true });

suiteBenchmark
  .add('Cart#cartPriceOld', function () {
    new CartPriceOld(database)
  })
  .add('Cart#carPriceNew', function () {
    new CartPriceNew(database)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });