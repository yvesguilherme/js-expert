import Event from 'events'

export default class Controller {
  constructor({ view, service, config, defaultInputFolder }) {
    this.view = view
    this.service = service
    this.config = config
    this.defaultInputFolder = defaultInputFolder
  }

  static async initialize(...args) {
    const controller = new Controller(...args)
    return controller._init()
  }

  handleGraphUpdate(item) {
    this.view.buildLineChart();
    const lineChartData = this.service.onLineChartUpdate(item)
    this.view.updateLineChart(lineChartData)
  }

  handleProgressBarUpdate(item) {
    return this.view.onProgressUpdated(item)
  }

  async _init() {
    const graphNotifier = new Event()
    const progressNotifier = new Event()

    this.view.initialize()

    progressNotifier.on('update', this.handleProgressBarUpdate.bind(this))
    graphNotifier.on('update', this.handleGraphUpdate.bind(this))

    try {
      await this.service.runPipeline({
        graphNotifier,
        progressNotifier
      })

    } catch (error) {
      console.log({ error: error.stack })
    }
  }
}