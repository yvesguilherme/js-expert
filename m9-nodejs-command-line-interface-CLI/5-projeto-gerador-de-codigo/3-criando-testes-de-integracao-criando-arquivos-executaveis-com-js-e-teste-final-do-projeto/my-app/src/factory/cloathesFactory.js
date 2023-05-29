
import CloathesService from '../service/cloathesService.js';
import CloathesRepository from '../repository/cloathesRepository.js';

export default class CloathesFactory {
  static getInstance() {
    const repository = new CloathesRepository();
    const service = new CloathesService({ repository });

    return service;
  }
}