const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai'); // Padrão do BDD
const sinon = require('sinon'); // Criar o stub para a função getRandomPositionFromArray

const CarService = require('./../../src/service/carService');
const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCar: require('../mocks/valid-car.json'),
  validCustomer: require('../mocks/valid-customer.json'),
};

describe('CarService Suite Tests', () => {
  let carService = {};
  let sandbox = {};

  // Antes de rodar qualquer test, ele irá criar a instância de CarService
  before(() => {
    carService = new CarService({
      cars: carsDatabase
    });
  });

  // Antes cada it, cria uma instância vazia do sinon
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  /**
   * Depois do it, modificamos, adicionou o stub e
   * Depois de cada um dos its rodarem, reseta o objeto.
   * Garante que o it não vai estar sujo, não terá stub perdido
   * entre um teste e outro.
   */
  afterEach(() => {
    sandbox.restore();
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    // Or expect(result).to.br.lte(data.length).and.be.gte(0)
    expect(result).to.be.lessThanOrEqual(data.length).and.be.greaterThanOrEqual(0);
  });

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    /**
     * Moca o retorno da função getRandomPositionFromArray,
     * retornando a sempre o primeiro item e assim o teste funcionar.
     */
    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it('Given a carCategory it should return an available car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory); // Usado para não modificar o objeto pai.
    carCategory.carsIds = [car.id];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car);

    /**
     * Verificar se a função foi chamada da forma correta.
     */
    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    );

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });
})