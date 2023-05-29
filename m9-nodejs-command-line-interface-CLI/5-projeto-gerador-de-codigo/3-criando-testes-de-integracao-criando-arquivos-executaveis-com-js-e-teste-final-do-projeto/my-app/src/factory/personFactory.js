
import PersonService from '../service/personService.js';
import PersonRepository from '../repository/personRepository.js';

export default class PersonFactory {
  static getInstance() {
    const repository = new PersonRepository();
    const service = new PersonService({ repository });

    return service;
  }
}