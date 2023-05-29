
import CarsService from '../service/carsService.js';
import CarsRepository from '../repository/carsRepository.js';

export default class CarsFactory {
  static getInstance() {
    const repository = new CarsRepository();
    const service = new CarsService({ repository });

    return service;
  }
}