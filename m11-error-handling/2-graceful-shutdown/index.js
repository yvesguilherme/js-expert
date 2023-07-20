import { MongoClient } from 'mongodb';
import { createServer } from 'http';
import { promisify } from 'util';

const uri = 'mongodb://localhost:27017';

async function dbConnect() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('mongodb is connected!');

    const db = client.db('comics');

    return {
      collections: { heroes: db.collection('heroes') },
      client
    };
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data);

      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString()
      });

      const heroes = await collections.heroes.find().toArray();

      response.writeHead(200);
      response.write(JSON.stringify(heroes));
    } catch (error) {
      console.log('a request error has happened', error);
      response.writeHead(500);
      response.write(JSON.stringify({ message: 'internal server error!' }));
    } finally {
      response.end();
    }
  }
}

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Nygma", "age": "32"}'
 */
const server = createServer(handler)
  .listen(3000, () => console.log(`running at 3000 and process`, process.pid));


const onStop = async (event) => {
  console.info(`\n${event} signal received!`);

  console.log(`Closing http server...`);

  await promisify(server.close.bind(server))();

  console.log(`Http server has closed!`);

  // O close(true) força o encerramento.
  await client.close();

  console.log(`Mongo connection has closed!`);

  /**
   * 0 - é tudo certo
   * 1 - é erro.
   */
  process.exit(0);
};

/**
 * SIGINT  => Manipula o evento do ctrl + c
 * SIGTERM => Manipula o evento do kill
 */
['SIGINT', 'SIGTERM'].forEach(event => process.on(event, onStop));