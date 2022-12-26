import NotImplementedException from "../notImplementedException.mjs";

// Interface simulada
export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name);
  }
};