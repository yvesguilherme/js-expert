
export default class DogsService {
  constructor({ repository: dogsRepository }) {
    this.dogsRepository = dogsRepository;
  }

  create(data) {
    return this.dogsRepository.create(data);
  }

  read(query) {
    return this.dogsRepository.read(query);
  }

  update(id, data) {
    return this.dogsRepository.update(id, data);
  }

  delete(id) {
    return this.dogsRepository.delete(id);
  }
}