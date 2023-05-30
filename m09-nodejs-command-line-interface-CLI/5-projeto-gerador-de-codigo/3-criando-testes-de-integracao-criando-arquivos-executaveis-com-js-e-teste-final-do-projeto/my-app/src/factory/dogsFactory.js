
import DogsService from '../service/dogsService.js';
import DogsRepository from '../repository/dogsRepository.js';

export default class DogsFactory {
  static getInstance() {
    const repository = new DogsRepository();
    const service = new DogsService({ repository });

    return service;
  }
}