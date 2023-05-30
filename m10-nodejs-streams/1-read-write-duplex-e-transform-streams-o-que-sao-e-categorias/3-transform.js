import { Readable, Transform, Writable } from 'stream';
import { createWriteStream } from 'fs';

// Fonte de dados
const readable = Readable({
  read() {
    // 1.000.000 de objetos.
    for (let index = 0; index < 1e6; index++) {
      // for (let index = 0; index < 2; index++) {
      const person = { id: Date.now() + index, name: `Yves-${index}` };
      const data = JSON.stringify(person);

      this.push(data);
    }

    // Informa que os dados acabaram!
    this.push(null);
  }
});

// processamento dos dados.
const mapHeaders = Transform({
  transform(chunck, encoding, cb) {
    this.counter = this.counter ?? 0;

    if (this.counter) {
      return cb(null, chunck);
    }

    this.counter += 1;

    cb(null, 'id,name\n'.concat(chunck));
  }
})

// processamento dos dados.
const mapFields = Transform({
  transform(chunck, encoding, cb) {
    const data = JSON.parse(chunck);
    const result = `${data.id},${data.name.toUpperCase()}\n`;

    /**
     * Primeiro parâmetro: se tem é erro, caso não, sucesso!
     */
    cb(null, result);
  }
});

// Saída de dados
// const writable = Writable({
//   write(chunk, encoding, cb) {
//     console.log('msg', chunk.toString());

//     cb();
//   }
// });

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saída! Ou seja, imprimir, salvar, ignorar
  // .pipe(writable);
  // .pipe(process.stdout);
  .pipe(createWriteStream('person.csv'));

pipeline
  .on('end', () => console.log('There will be no more data.'));