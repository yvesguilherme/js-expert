import database from '../database.json' assert {type: 'json'};
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';
const STOP_TERM = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function  mainLoop() {
  try {
    const answer = await terminalController.question('');

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log('process finished!');
      return;
    }

    const person = Person.generateInstanceFromString(answer);

    console.log('person', person.formatted(DEFAULT_LANG));

    return mainLoop();

  } catch (error) {
    console.error('Deu ruim...**', error);
    return mainLoop();
  }
}

/**
 * Se não funcionar, colocar no script dev após o primeiro experimental:
 * --experimental-top-level-await
 */
await mainLoop();