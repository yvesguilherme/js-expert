$.verbose = false;

import { setTimeout } from 'timers/promises';
import isSafe from 'safe-regex';

await $`docker run -p "8080:80" -d nginx`;
await setTimeout(500);
const req = await $`curl --silent localhost:8080`;
console.log(`req\n`, req.stdout);

const containers = await $`docker ps`;

// unsafe regex!
// const expression = /(?<containerId>\w+)\W+(?=nginx) (x+x+)+y/;
const expression = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(expression)) {
  throw new Error('unsafe regex!');
}

const { groups: { containerId } } = containers.toString().match(expression);

const logs = await $`docker logs ${containerId}`;
console.log('\nlogs...\n', logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log('\rrm...\n', rm.stdout);