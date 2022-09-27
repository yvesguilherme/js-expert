const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('./service');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2';
const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json')
};

; (async () => {
  {
    /**
     * Dessa forma vai para a internet, não é o ideal em
     * cenários de testes.
     */
    // const service = new Service();
    // const withoutStub = await service.makeRequest(BASE_URL_2);
    // console.log(JSON.stringify(withoutStub));
  }

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine);

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan);

  {
    // Testar se o stub está devolvendo o objeto mocado

    // const response = await service.makeRequest(BASE_URL_1)
    // console.log('response', response);
  }

  {
    const expected = {
      name: 'Tatooine',
      terrain: 'desert',
      surfaceWater: '1',
      appearedIn: 5
    };
    const results = await service.getPlanets(BASE_URL_1);

    /**
     * Primeiro parâmetro: sempre o que já temos na mão;
     * Segundo  parâmetro: sempre o esperado.
     */
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      name: 'Alderaan',
      terrain: 'grasslands, mountains',
      surfaceWater: '40',
      appearedIn: 2
    };

    const results = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(results, expected);
  }
})();