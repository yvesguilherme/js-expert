/**
 * para importar do diretório deste projeto, use o comando abaixo no package.json:
 * "scripts": {
 *  "start": "node --experimental-specifier-resolution=node index.js"
 * }
 */
// import FluentSQLBuilder from './../fluentsql-jest-tdd-yt/index.js';
import FluentSQLBuilder from '@yvesguilherme/fluentsql';

import database from './database/data.js';

const result = FluentSQLBuilder
  .for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(['name'])
  .limit(3)
  .countBy('name')
  .build();

console.log({ result });