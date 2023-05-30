import NotImplementedException from "../notImplementedException.mjs";

// Interface simulada
export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name);
  }
};