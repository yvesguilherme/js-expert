const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

// <Poderia estar em outro arquivo>
const dbData = [{ name: 'Mariazinha' }, { name: 'Joaozinho' }];
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
};
// </Poderia estar em outro arquivo>

rewiremock(() => require('./../src/util/database')).with(MockDatabase);

; (async () => {
  {
    const expected = [{ name: 'MARIAZINHA' }, { name: 'JOAOZINHO' }];
    rewiremock.enable();
    const UserFactory = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }

  {
    const expected = [{ name: 'YVESGUILHERME' }];
    const UserFactory = require('../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();