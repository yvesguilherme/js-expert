import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

import database from '../database.json' assert {type: 'json'};
import Person from './person.js';

DraftLog(console).addLineListener(process.stdin);

const DEFAULT_LANG = 'pt-BR';
const options = {
  leftPad: 2,
  /**
   * Field: campo no json;
   * Name:  nome na tabela.
   */
  columns: [
    { field: 'id', name: chalk.cyan('ID') },
    { field: 'vehicles', name: chalk.magenta('Vehicles') },
    { field: 'kmTraveled', name: chalk.redBright('Km Traveled') },
    { field: 'from', name: chalk.greenBright('From') },
    { field: 'to', name: chalk.yellowBright('To') }
  ]
};

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)));
const print = console.draft(table);

// setInterval(() => {
//   database.push({
//     id: Date.now(),
//     vehicles: [`Vehicle ${Date.now()}`],
//     kmTraveled: Math.floor(Math.random() * 30000),
//     from: new Date(new Date() - Math.random() * (1e+12)).toLocaleDateString('en-CA'),
//     to: new Date(new Date() - Math.random() * (1e+12)).toLocaleDateString('en-CA')
//   });
//   const table = chalkTable(options, database);
//   print(table);
// }, 400);

const terminal = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

terminal.question(`What's your name? `, msg => {
  console.log('msg', msg.toString());
});