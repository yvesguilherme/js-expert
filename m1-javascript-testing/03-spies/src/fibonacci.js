class Fibonacci {
  // Generators
  *execute(input, current = 0, next = 1) {
    // console.count('execute!');

    if (input === 0) {
      return 0;
    }

    /**
     * É como o return, porém retorna valores sob demanda.
     */
    yield current;

    /**
     * Yield com asterisco delega a função, mas não retorna valor.
     */
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;