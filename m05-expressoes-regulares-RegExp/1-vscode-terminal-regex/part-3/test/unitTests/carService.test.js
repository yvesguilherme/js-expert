'use strict';

const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai'); // Padrão do BDD
const sinon = require('sinon'); // Criar o stub para a função getRandomPositionFromArray

const CarService = require('./../../src/service/carService');
const Transaction = require('./../../src/entities/transaction');
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

    // Or expect(result).to.be.lte(data.length).and.be.gte(0)
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
    carCategory.carIds = [car.id];

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

  it('given a carCategory, customer and numberOfDays it should calculate final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    /**
     * Age: 50 - 1.3 tax - carCategoryPrice 37.6
     * 37.6 * 1.3 = 48.88 * 5 (days) = 244.40
     */

    // Não depender de dados externos!
    sandbox.stub(
      carService,
      'taxesBasedOnAge' // propriedades dentro de uma classe, não tem o .name
    ).get(() => [{ from: 40, to: 50, then: 1.3 }]);
    // console.log('taxes', carService.taxesBasedOnAge);

    const expected = carService.currencyFormat.format(244.40);
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    expect(result).to.be.deep.equal(expected);
  });

  it('given a customer and a car category it should return a transaction receipt', async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    };

    const customer = Object.create(mocks.validCustomer);
    customer.age = 20;

    const numberOfDays = 5;
    const dueDate = '10 de novembro de 2020';

    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());
    // console.log('now 01', now);
    // console.log('now 02', new Date());

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car);

    /**
     * age: 20, tax: 1.1, categoryPrice: 37.6
     * 37.6 * 1.1 = 41.36 * 5 (days) = 206.8
     */
    const expectedAmount = carService.currencyFormat.format(206.8);

    const result = await carService.rent(
      customer, carCategory, numberOfDays
    );

    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount: expectedAmount,
    });

    expect(result).to.be.deep.equal(expected);
  });
})