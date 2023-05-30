const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('./service');

const BASE_URL_1 = 'https://swapi.dev/api/starships/3';
const BASE_URL_2 = 'https://swapi.dev/api/starships/9';
const mocks = {
  starDestrouyer: require('../mocks/star-destroyer.json'),
  deathStar: require('../mocks/death-star.json')
};

; (async () => {
  {
    // Using the internet
    // const service = new Service();
    // const withoutStub = await service.makeRequest(BASE_URL_1);
    // console.log('Without stub', JSON.stringify(withoutStub));
  }

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.starDestrouyer);

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.deathStar);

  {
    // Testing if the stub returns a mock object
    // const response = await service.makeRequest(BASE_URL_1);
    // console.log('Stub response', response);
  }

  {
    const expected = {
      name: 'Star Destroyer',
      model: 'Imperial I-class Star Destroyer',
      manufacturer: 'Kuat Drive Yards',
      passengers: 'n/a',
      hyperdriveRating: '2.0',
      starshipClass: 'Star Destroyer'
    };

    const results = await service.getStarShips(BASE_URL_1);
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      name: 'Death Star',
      model: 'DS-1 Orbital Battle Station',
      manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
      passengers: '843,342',
      hyperdriveRating: '4.0',
      starshipClass: 'Deep Space Mobile Battlestation'
    };

    const results = await service.getStarShips(BASE_URL_2);
    deepStrictEqual(results, expected);
  }
})();