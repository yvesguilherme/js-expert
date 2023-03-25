import ContextStrategy from "./src/base/contextStrategy.js";
import PostgreSQLStrategy from "./src/strategies/postgreSQLStrategy.js";

const postgreSQLConnectionString = 'postgres://yvesguilherme:senha001@localhost:5432/heroes';
const postgreSQLStrategy = new ContextStrategy(new PostgreSQLStrategy(postgreSQLConnectionString));
const result = await postgreSQLStrategy.connect();
console.log({ result });

// DB
const data = [
  {
    name: 'yvesguilherme',
    type: 'transaction' // vai no SQL
  },
  {
    name: 'gabi',
    type: 'activityLog' // vai no mongodb
  }
];

