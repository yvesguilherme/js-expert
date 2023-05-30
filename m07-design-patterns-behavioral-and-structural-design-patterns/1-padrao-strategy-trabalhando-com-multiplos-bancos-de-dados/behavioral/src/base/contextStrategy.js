export default class ContextStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy;
  }

  async connect() {
    return this.dbStrategy.connect();
  }

  async create(item) {
    return this.dbStrategy.create(item);
  }

  async read(item) {
    return this.dbStrategy.read(item);
  }
}