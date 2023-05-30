
export default class CloathesService {
  constructor({ repository: cloathesRepository }) {
    this.cloathesRepository = cloathesRepository;
  }

  create(data) {
    return this.cloathesRepository.create(data);
  }

  read(query) {
    return this.cloathesRepository.read(query);
  }

  update(id, data) {
    return this.cloathesRepository.update(id, data);
  }

  delete(id) {
    return this.cloathesRepository.delete(id);
  }
}