const { faker } = require('@faker-js/faker');
const { join } = require('path');
const { writeFile } = require('fs/promises');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: +faker.finance.amount(20, 200)
});

const write = (filename, data) => writeFile(
  join(seederBaseFolder, filename),
  JSON.stringify(data)
);

; (async () => {
  await write('carCategory.json', [carCategory]);

  console.log(carCategory);
})();