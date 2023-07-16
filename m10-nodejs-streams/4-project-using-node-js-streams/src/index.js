
import config from './config.js'
import View from './view.js';
import Service from './service.js';
import Controller from './controller.js';

const outputfileName = 'final.json'
const defaultPath = './docs'
const defaultInputFolder = `${defaultPath}/state-of-js`
const outputFinal = `${defaultPath}/${outputfileName}`

// FACTORY!

const view = new View();
const service = new Service({
  ...config,
  outputFinal,
  defaultInputFolder
});

await Controller.initialize({
  view,
  service,
  defaultInputFolder
})
// console.time('elapsed time')
