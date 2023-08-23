import { createServer } from 'http';
import Events from 'events';
import { randomBytes } from 'crypto';

const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

const PORT = 3000;

function onData() {
  getBytes();
  const items = [];

  setInterval(function myInterval() { items.push(Date.now()) });
}

createServer(function handler(request, response) {
  myEvent.on('data', onData);

  myEvent.emit('data', Date.now());
  response.end('OK\n');
})
  .listen(PORT, () => console.log(`running at ${PORT}`));