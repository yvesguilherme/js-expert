export default class MongoDBStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy;
  }

  async connect() { }

  async create(item) { }

  async read(item) { }
}