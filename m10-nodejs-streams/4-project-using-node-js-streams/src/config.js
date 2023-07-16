
const likes = ['interested', 'would_use']

const years = ['2016', '2017', '2018', '2019']
const defaultY = () => [0, 0, 0, 0]

const lineChartData = {
  angular: {
    title: 'angular',
    x: years,
    y: defaultY(),
    style: {
      // vermelho angular
      line: [170, 42, 44]
    }
  },
  react: {
    title: 'react',
    x: years,
    y: defaultY(),
    // azul react
    style: { line: [97, 218, 251] }
  },
  vuejs: {
    title: 'vuejs',
    x: years,
    y: defaultY(),
    // verde vue
    style: { line: [63, 178, 127] }
  },
  ember: {
    title: 'ember',
    x: years,
    y: defaultY(),
    // laranja vue
    style: { line: [218, 89, 46] }
  },
  backbone: {
    title: 'backbone',
    x: years,
    y: defaultY(),
    // verde backbone
    style: { line: [37, 108, 74] }
  }
}

export default {
  likes,
  years,
  lineChartData,
  tecnologiesInAnalysis: Reflect.ownKeys(lineChartData)
}