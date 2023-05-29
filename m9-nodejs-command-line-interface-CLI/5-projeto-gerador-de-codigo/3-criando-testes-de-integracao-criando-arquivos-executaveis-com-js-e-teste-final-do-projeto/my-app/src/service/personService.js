
export default class PersonService {
  constructor({ repository: personRepository }) {
    this.personRepository = personRepository;
  }

  create(data) {
    return this.personRepository.create(data);
  }

  read(query) {
    return this.personRepository.read(query);
  }

  update(id, data) {
    return this.personRepository.update(id, data);
  }

  delete(id) {
    return this.personRepository.delete(id);
  }
}