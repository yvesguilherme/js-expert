import { createReadStream, createWriteStream, statSync } from 'fs'
import { readdir } from 'fs/promises'
import { join } from 'path'


import { pipeline } from "stream";
import { promisify } from 'util'
const pipelineAsync = promisify(pipeline)

import split from 'split2'
import StreamConcat from 'stream-concat'


export default class Service {
  #years
  #likes
  #lineChartData
  #outputFinal
  #tecnologiesInAnalysis
  #defaultInputFolder

  constructor({ years, likes, lineChartData, outputFinal, defaultInputFolder, tecnologiesInAnalysis }) {
    this.#years = years
    this.#likes = likes
    this.#lineChartData = lineChartData
    this.#outputFinal = outputFinal
    this.#tecnologiesInAnalysis = tecnologiesInAnalysis
    this.#defaultInputFolder = defaultInputFolder
  }
  // 1
  async prepareStreams(folder) {
    const files = (await readdir(folder))//.slice(0, 100)
    const filesSize = this.getFilesSize(files, folder)

    const streams = files.map(
      file => createReadStream(join(folder, file))
    )

    const stream = new StreamConcat(streams)
    return { stream, filesSize }
  }

  async runPipeline({ graphNotifier, progressNotifier }) {
    const result = await this.prepareStreams(this.#defaultInputFolder)
    return this.runProcess({
      ...result,
      graphNotifier,
      progressNotifier
    })
  }

  async runProcess({ stream, graphNotifier, progressNotifier, filesSize }) {

    return pipelineAsync
      (
        stream,
        this.handleProgressBar(filesSize, progressNotifier),
        split(JSON.parse),
        this.mapFunction.bind(this),
        this.aggregate(graphNotifier),
        createWriteStream(this.#outputFinal),
      )
  }

  // 2
  handleProgressBar(filesSize, progressNotifier) {
    let processedAlready = 0;

    async function* progressBar(source) {
      for await (const data of source) {
        processedAlready += data.length
        progressNotifier.emit('update', { processedAlready, filesSize })
        yield data
      }
    }
    return progressBar.bind(this)
  }

  // 3
  async * mapFunction(source) {
    const likes = this.#likes


    for await (const data of source) {
      const tools = data.tools;
      // falar que tem pessoas que escolheram os dois como preferencia, 
      // mas vamos ignorar e supor que são pessoas diferentes

      /*
          {
              react: true,
              vuejs: false,
              angular: true,
              ember: false
          }
      */
      const item = this.mergeListIntoObject(
        {

          list: this.#tecnologiesInAnalysis,
          mapper: tech => ({
            [tech]: likes.includes(tools?.[tech]?.experience)
          })
        }
      )


      const finalItem = {
        ...item,
        year: data.year
      }


      yield finalItem
    }
  };

  // 4
  aggregate(graphNotifier) {

    async function* feedGraph(source) {
      /*
          yearsInContext = {
              '2018': {
                  react: 0,
                  ...
              },
              '2019': {
                  react: 0,
                  ...
              },
              total: vai contar todos os votos, somente quanto for chamado
          }
      */
      const yearsInContext = this.aggregateItemsPerYear(this.#years)
      /*
      para cada data tem:

      {
          react: true,
          angular: true,
          year: 2018                
      }
      */

      for await (const data of source) {
        const year = data.year.toString()
        Reflect.deleteProperty(data, 'year')

        // aqui vai contabilizar os votos
        // key = 'react'
        // year = 2017
        // data[key] = data['react'] = ou false ou true, = ou 0 ou 1
        // yearsInContext[2017][react] += 1 ou 0
        Reflect.ownKeys(data).forEach(key => (yearsInContext[year][key] += data[key]))
      }

      // após calcular tudo, fala para atualizar o gráfico
      /*
       yearsInContext = {
           '2018': {
               react: 2000,
               ...
           },
           '2019': {
               react: 4000,
               ...
           },
           total: 6000 (vai contar todos os votos, somente quanto for chamado)
       }
       */
      graphNotifier.emit('update', yearsInContext)

      // passa esse valor para frente para salvar no arquivo
      yield JSON.stringify(yearsInContext)
    }

    return feedGraph.bind(this)

  }

  aggregateItemsPerYear(years) {
    /*
    initialValues = {
        react: 0,
        angular: 0
        ...
    }
    */
    const initialValues = this.mergeListIntoObject(
      {
        list: this.#tecnologiesInAnalysis,
        mapper: item => ({ [item]: 0 })
      }
    )

    /*
    mapItemsPerYear = [
        [
            2019: {
                react: 0,
                angular: 0
                ...
            },
        ],
        [
            2018: {
                react: 0,
                angular: 0
                ...
            }
        ]
    ]
    */
    const mapItemsPerYear = year => ({
      [year]: {
        ...initialValues,

        get total() {
          return Reflect.ownKeys(this)
            .filter(key => key !== 'total')
            .map(key => this[key])
            .reduce((prev, next) => prev + next, 0);
        }
      }
    });

    /*
    {
        '2018': {...},
        '2019': {...},
        total: vai contar todos os votos, somente quanto for chamado
    }
    */
    return this.mergeListIntoObject({
      list: years,
      mapper: mapItemsPerYear
    })
  }

  mergeListIntoObject({ list, mapper }) {
    return list.map(mapper)
      .reduce((prev, next) => ({ ...prev, ...next }), {});
  }

  getFilesSize(files, folder) {
    return files
      .map(file => statSync(join(folder, file)).size)
      .reduce((prev, next) => prev + next, 0);
  }


  onLineChartUpdate(item) {

    Reflect.ownKeys(item)
      .map(year => {
        // indexYear = '2018'
        const indexYear = this.#years.indexOf(year.toString())

        /* 
            item[year] = {
                total: 1000,
                react: 2000,
                ...
            }
        */
        const { total, ...yearContext } = item[year]
        /*
            this.#lineChartData['react'].y['2017'] = yearContext['react'] ou 2000
        */

        Reflect.ownKeys(yearContext)
          .map(lib => this.#lineChartData[lib].y[indexYear] = yearContext[lib])
      })

    return Object.values(this.#lineChartData)
  }
}