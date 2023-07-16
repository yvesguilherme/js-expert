import blessed from 'blessed'
import contrib from 'blessed-contrib'

export default class View {

  constructor() {
    this.screen = null;
    this.lastProgressUpdated = 0;

    this.progressBar = null
    this.lineChart = null

  }

  initialize() {
    this.buildInterface();
    this.buildProgressBar()
  }

  buildInterface() {
    const screen = this.screen = blessed.screen();
    screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
    screen.render();

    return screen;
  }

  buildProgressBar() {
    this.progressBar = contrib.donut({
      left: 'center',
      top: 'center',
      height: '50%',
      width: '50%',

      radius: 8,
      arcWidth: 3,
      remainColor: 'black',
      yPadding: 2
    });
    this.screen.append(this.progressBar);
    this.screen.render()
  }

  buildLineChart() {
    if (this.lineChart) return;

    this.lineChart = contrib.line(
      {
        left: 'center',
        top: 'center',
        border: 'line',
        height: '100%',
        width: '100%',
        label: 'Frameworks Most Used per Year',
        showLegend: true,
        // abbreviate: true,
      });

    this.screen.append(this.lineChart);
  }

  updateLineChart(lineChartData) {
    this.lineChart.setData(lineChartData)
    this.screen.render();
  }

  onProgressUpdated({ processedAlready, filesSize }) {
    const alreadyProcessed = Math.ceil(processedAlready / filesSize * 100);

    if (this.lastProgressUpdated === alreadyProcessed) return;

    this.lastProgressUpdated = alreadyProcessed;

    this.progressBar.setData([
      { percent: alreadyProcessed, label: 'processing...', 'color': 'green' },
    ]);

    this.screen.render();
  }
}