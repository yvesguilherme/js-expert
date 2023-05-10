#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });

const { argv } = yargs(hideBin(process.argv))
  .command('createHero', 'create a hero', (builder) => {
    return builder
      .option('name', {
        alias: 'n',
        demandOption: true,
        description: 'hero name',
        type: 'string'
      })
      .option('age', {
        alias: 'a',
        demandOption: true,
        description: 'hero age',
        type: 'number'
      })
      .option('power', {
        alias: 'p',
        demandOption: true,
        description: 'hero power',
        type: 'string'
      })
      .example('createHero --name Hulk --age 27 --power Strength', 'create a hero')
      .example('createHero -n Hulk -a 27 -p Strength', 'create a hero');
  })
  .epilog(`copyright © ${new Date().getFullYear()} - Yves Guilherme Corporation`);


console.log(hero(argv));