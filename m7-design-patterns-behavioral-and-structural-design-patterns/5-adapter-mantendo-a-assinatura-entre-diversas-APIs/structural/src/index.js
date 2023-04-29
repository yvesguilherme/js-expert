import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAdapter from "./business/adapters/rickAndMortyUSAdapter.js";

const data = [
  RickAndMortyBRLAdapter,
  RickAndMortyUSAdapter
].map(integration => integration.getCharacters());

const promiseAll = await Promise.allSettled(data);

const successes = promiseAll
  .filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

const errors = promiseAll.filter(({ status }) => status === 'rejected');

console.table(successes);
console.table(errors);