import mocha from 'mocha';
const { describe, it } = mocha;

import chai from 'chai';
const { expect } = chai;

import Person from '../src/person.js';

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 20000 2020-10-31 2022-10-31'
    );

    const expected = {
      from: '2020-10-31',
      to: '2022-10-31',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '20000',
      id: '1'
    };

    expect(person).to.be.deep.equal(expected);
  });

  it('should format values', () => {
    const person = new Person({
      from: '2020-10-31',
      to: '2022-10-31',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '20000',
      id: '1'
    });

    const result = person.formatted('pt-BR');
    const expected = {
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '20.000 km',
      from: '31 de outubro de 2020',
      to: '31 de outubro de 2022'
    };

    expect(result).to.be.deep.equal(expected);
  });
});