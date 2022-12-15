'use strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter';
event.on(eventName, msg => console.log('counter updated', msg));

// event.emit(eventName, 'hi');
// event.emit(eventName, 'bye');

const myCounter = {
  counter: 0
};
const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;
    return true;
  },
  get: (object, prop) => {
    // console.log('chamou!', { object, prop });
    return object[prop];
  }
});

/**
 * Executa uma tarefa que será realizada no futuro e
 * continuará sendo executada.
 * "Jájá e sempre"
 */
setInterval(function () {
  proxy.counter += 1;
  console.log('[3]: setInterval!');

  if (proxy.counter === 10) {
    clearInterval(this);
  }
}, 200);

/**
 * É uma má prática utilizar 0 para executar o setTimeout
 * no exato momento (utilizando os ms. como 0).
 * O setTimeout é para algo que deverá acontecer no futuro.
 */
setTimeout(() => {
  proxy.counter = 4;
  console.log('[2]: timeout!');
}, 100);

/**
 * Se quiser que execute agora.
 */
setImmediate(() => {
  console.log('[1]: setImmediate!', proxy.counter);
});

/**
 * Executa agora, agorinha, mas acaba com o ciclo de vida do node.
 * É uma má prática utilizar desta forma.
 */
process.nextTick(() => {
  proxy.counter = 2;
  console.log('[0]: nextTick!');
});

/**
 * Ordem de execução:
 * process.nextTick -> setImmediate -> setTimeout -> setInterval
 */