import Http from 'http';

const SERVER_PORT = 3000;
let COUNT = 1;

async function handler(request, response) {
  COUNT++;

  try {
    if (COUNT % 2 === 0) {
      await Promise.reject(`error inside handler!`);
    }

    /**
     * For await tem um contexto diferente no JS e o erro deve ser
     * manipulado de uma forma diferente.
     */
    for await (const data of request) {
      try {
        if (COUNT % 2 !== 0) {
          await Promise.reject(`error inside for!`);
        }

        // response.end();
      } catch (error) {
        console.log(`a request error has happened`, error);
        response.writeHead(500);
        response.write(JSON.stringify({ message: `internal server error!` }));
        // response.end();
      }
    }
  } catch (error) {
    console.log(`a server error has happened`, error);
    response.writeHead(500);
    response.write(JSON.stringify({ message: `internal server error!` }));
    response.end();
  } finally {
    response.end();
  }
}

Http
  .createServer(handler)
  .listen(SERVER_PORT, () => console.log(`Running at ${SERVER_PORT}`));