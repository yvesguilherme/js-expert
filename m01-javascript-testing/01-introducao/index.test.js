const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

;
(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    Date.prototype.getFullYear = () => 2022;
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "name": "Yves",
        "id": 123,
        "profession": "Javascript Programmer",
        "birthDay": 1995
      },
      {
        "name": "Xuxa da Silva",
        "id": 321,
        "profession": "Javascript Specialist",
        "birthDay": 1942
      },
      {
        "name": "Joaozinho",
        "id": 231,
        "profession": "Java Developer",
        "birthDay": 1992
      }
    ];

    /**
     * Além de verificar o valor, ele verifica também
     * a referência, ou seja, olha todo o objeto.
     */
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();