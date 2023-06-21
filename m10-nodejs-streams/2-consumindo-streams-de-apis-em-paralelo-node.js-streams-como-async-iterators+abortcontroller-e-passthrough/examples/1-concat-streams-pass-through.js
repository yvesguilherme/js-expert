import axios from 'axios';
import { Writable, PassThrough } from 'stream';

const URL_API_01 = `http://localhost:3000`;
const URL_API_02 = `http://localhost:4000`;
const CONFIG_AXIOS = {
  method: 'get',
  responseType: 'stream'
};

const requests = await Promise.all([
  axios({
    ...CONFIG_AXIOS,
    url: URL_API_01
  }),
  axios({
    ...CONFIG_AXIOS,
    url: URL_API_02
  })
]);

const results = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, '');

    /**
     * ?=-            : procura a partir do - (hífen) e olha para trás
     * :"(?<name>.*)  : procura pelo conteúdo dentro das aspas após os : (dois pontos) 
     * e extrai somente o name (nome do grupo)
     */
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;

    console.log(`[${name.toLowerCase()}] ${data}`);

    callback();
  }
});

// results[0].pipe(output);
// results[1].pipe(output);

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // Impede que a stream feche sozinha.
    current.pipe(prev, { end: false });

    /**
     * Como foi colocado o { end: false }, vamos manipular manualmente quando o nosso
     * current terminar. Quando ele terminar, vamos verificar se todos no pipeline se encerraram
     * ele vai então forçar a cadeia do anterior a se fechar.
     */
    current.on('end', () => items.every(item => item.ended) && prev.end());

    return prev;
  }, new PassThrough());
}

const streams = merge(results).pipe(output);