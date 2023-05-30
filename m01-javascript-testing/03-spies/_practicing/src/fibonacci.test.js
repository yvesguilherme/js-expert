const assert = require('assert');
const sinon = require('sinon');

const Fibonacci = require('./fibonacci');

; (async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // Execute começa sempre com 0! (0, 1, 2, 3, 4)
    for (const i of fibonacci.execute(4)) {
      // console.log(i);
    }
    // console.log('callcount', spy.callCount);
    const expectedCallCount = 5;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);

    const { args } = spy.getCall(3);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 2,
      current: 2,
      next: 3
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
})();