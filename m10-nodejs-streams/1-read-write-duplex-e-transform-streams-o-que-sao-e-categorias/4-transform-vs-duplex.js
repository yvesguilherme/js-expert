import { Duplex, Transform } from 'stream';

let count = 0;

const server = new Duplex({
  objectMode: true, // faz não precisar trabalhar com buffer, porém gasta mais memória.
  encoding: 'utf-8',

  // gerar informações
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Yves[${count}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () { everySecond(this); });
  },

  // é como se fosse um objeto completamente diferente!
  write(chunk, encoding, cb) {
    console.log(`[writable] saving...`, chunk);

    cb();
  }
});

/**
 * Provar que são canais de comunicação diferentes!
 * O write aciona o writable do Duplex.
 */
server.write(`[duplex] hey this is a writable!\n`);
// O on('data') loga o que rolou no .push do readable (read () {}).
// server.on('data', msg => console.log(`[readable]${msg}`));

// O push deixa você enviar mais dados.
server.push(`[duplex] hey this is also a readable\n`);

// server.pipe(process.stdout);

const transformToUpperCase = Transform({
  objectMode: true,

  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  }
});

// O transform é também um Duplex, mas não possuem comunicação independente.
transformToUpperCase.write('[transform] hello from write!');
// O push vai ignorar o que você tem na função transform!
transformToUpperCase.push('[transform] hello from push!\n');

server
  .pipe(transformToUpperCase)
  // redireciona todos os dados de readable para o writable da Duplex (Exemplo o pacote net do node.js).
  .pipe(server);