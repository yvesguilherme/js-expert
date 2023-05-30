import chalk from 'chalk';
import chalkTable from 'chalk-table';

import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);
    const options = {
      leftPad: 2,
      columns
    };
    const table = chalkTable(options, data);
    console.log(table);
  }

  prepareData(data) {
    const [firsItem] = data;
    const headers = Object.keys(firsItem);
    const formatHeader = (data, index) => index % 2 === 0 ? chalk.yellow(data) : chalk.green(data);

    const columns = headers
      .map((item, index) => ({
        field: item,
        name: formatHeader(item, index)
      }));

    return columns;
  }
}