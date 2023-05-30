import { database } from '../shared/data.mjs';

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  initialize(database) {
    this.table.render(database);
  }
}

; (async function main() {
  const platform = globalThis.window ? 'browser' : 'console';
  /**
   * Importação dinâmica.
   * ViewFactory é um apelido para o default que vem da importação, pois o export default não exporta o nome da classe
   * e sim um objeto default.
   */
  const { default: ViewFactory } = await import(`./../platforms/${platform}/index.mjs`);
  const app = new Application(new ViewFactory());
  app.initialize(database);
})();