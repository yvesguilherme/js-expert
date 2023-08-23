import { appendFile } from 'fs/promises';
import { createServer } from 'http';

const SERVER_PORT = 3000;

export function initializeServer() {
  async function handler(request, response) {
    await appendFile(`./log.txt`, `processed by pid: ${process.pid}\n`);

    const result = Array.from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
      .reduce((prev, next) => prev + next, 0);

    response.end(result.toString());
  }

  createServer(handler)
    .listen(SERVER_PORT, () => console.log(`server running at ${SERVER_PORT} and pid ${process.pid}`));
  
  setTimeout(() => process.exit(1), Math.random() * 1e4);
}