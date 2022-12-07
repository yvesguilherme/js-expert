
let _counter = new WeakMap();
let _action_end = new WeakMap();
let _action_error = new WeakMap();

class Countdown {
  constructor(counter, actionEnd, actionError) {
    _counter.set(this, counter);
    _action_end.set(this, actionEnd);
    _action_error.set(this, actionError);
  }

  decrement() {
    let counter = _counter.get(this);

    if (counter < 1) {
      _action_error.get(this)();
    }

    counter--;

    _counter.set(this, counter);

    if (counter === 0) {
      _action_end.get(this)();
    }
  }
}

let c = new Countdown(3, () => console.log('DONE'), () => console.log('INVALID NUMBER'));
c.decrement();
c.decrement();
c.decrement();