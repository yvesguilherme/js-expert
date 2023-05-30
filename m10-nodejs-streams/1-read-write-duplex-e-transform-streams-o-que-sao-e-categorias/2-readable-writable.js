import { Readable, Writable } from 'stream';

// Fonte de dados
const readable = Readable({
  read() {
    this.push('Hello world 1!');
    this.push('Hello world 2!');
    this.push('Hello world 3!');

    // Informa que os dados acabaram!
    this.push(null);
  }
});

// Saída de dados
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log('msg', chunk.toString());

    cb();
  }
});

readable
  // writable é sempre a saída! Ou seja, imprimir, salvar, ignorar
  .pipe(writable);
  // .pipe(process.stdout);