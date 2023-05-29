
export default class CarsService {
  constructor({ repository: carsRepository }) {
    this.carsRepository = carsRepository;
  }

  create(data) {
    return this.carsRepository.create(data);
  }

  read(query) {
    return this.carsRepository.read(query);
  }

  update(id, data) {
    return this.carsRepository.update(id, data);
  }

  delete(id) {
    return this.carsRepository.delete(id);
  }
}