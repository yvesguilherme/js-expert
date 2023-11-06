import Clock from './deps/clock.js';
import View from './view.js';

const view = new View();
const clock = new Clock();

const worker = new Worker('./src/web-worker/worker.js', {
  type: 'module'
});

worker.onerror = (error) => {
  console.error(`Error worker`, error);
};

worker.onmessage = ({ data }) => {
  if (data.status !== 'done') {
    return;
  }

  // setTimeout(() => {
    clock.stop();
    view.updateElapsedTime(`Process took ${took.replace('ago', '')}`);
  // }, 5000);
};

let took = '';
view.configureOnFileChange(file => {
  const canvas = view.getCanvas();
  /**
   * segundo parâmetro Transferable[], é uma função que vai ser transferida do
   * processo principal para o segundo. É usado geralmente para atualizar view,
   * porém somente alguns elementos funciona.
   */
  worker.postMessage(
    {
      file,
      canvas
    },
    [
      canvas
    ]
  );

  clock.start((time) => {
    took = time;
    view.updateElapsedTime(`Process started ${time}`);
  });
});

async function fakeFetch() {
  const filePath = '/videos/frag_bunny.mp4';
  const response = await fetch(filePath);
  // const response = await fetch(filePath, {
  //   method: 'HEAD'
  // });

  // const tamanhoArquivo = response.headers.get('content-length'); // file length

  // if (tamanhoArquivo == 0) {
  //   throw new Error(`This file cannot be processed!`);
  // }


  const file = new File([await response.blob()], filePath, {
    type: 'video/mp4',
    lastModified: Date.now()
  });

  const event = new Event('change');
  Reflect.defineProperty(
    event,
    'target',
    {
      value: {
        files: [file]
      }
    }
  );

  document.getElementById('fileUpload').dispatchEvent(event);
}

fakeFetch();