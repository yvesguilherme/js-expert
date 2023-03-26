import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgreSQLStrategy from "./src/strategies/postgreSQLStrategy.js";

const postgreSQLConnectionString = 'postgres://yvesguilherme:senha001@localhost:5432/heroes';
const postgreSQLContext = new ContextStrategy(new PostgreSQLStrategy(postgreSQLConnectionString));
await postgreSQLContext.connect();
// console.log({ result });

const mongoDBConnectionString = 'mongodb://yvesguilherme:senha002@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();


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

// "ENUM"
const contextTypes = {
  transaction: postgreSQLContext,
  activityLog: mongoDBContext
};

for (const { type, name } of data) {
  const contextType = contextTypes[type];

  await contextType.create({ name: `${name} ${Date.now()}` });

  console.log(type, contextType.dbStrategy.constructor.name);
  console.log(await contextType.read());
}

// await postgreSQLContext.create({ name: data[0].name });
// console.log(await postgreSQLContext.read());

// await mongoDBContext.create({ name: data[1].name });
// console.log(await mongoDBContext.read());
