
export default class AirplaneService {
  constructor({ repository: airplaneRepository }) {
    this.airplaneRepository = airplaneRepository;
  }

  create(data) {
    return this.airplaneRepository.create(data);
  }

  read(query) {
    return this.airplaneRepository.read(query);
  }

  update(id, data) {
    return this.airplaneRepository.update(id, data);
  }

  delete(id) {
    return this.airplaneRepository.delete(id);
  }
}