const { rejects, deepStrictEqual } = require('assert');

const { error } = require("./src/constants");
const JsonFile = require("./src/json-file");

; (async () => {
  {
    const filePath = './mocks/empty-json-invalid.json';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = JsonFile.readJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/six-items-invalid.json';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = JsonFile.readJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/invalid-key.json';
    const rejection = new Error(error.FILE_KEYS_ERROR_MESSAGE);
    const result = JsonFile.readJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/five-items-valid.json';
    const result = await JsonFile.readJson(filePath);
    const expected = [
      {
        "name": "Harry Potter",
        "house": "Gryffindor",
        "yearOfBirth": 1980,
        "wizard": true,
        "ancestry": "half-blood"
      },
      {
        "name": "Hermione Granger",
        "house": "Gryffindor",
        "yearOfBirth": 1979,
        "wizard": true,
        "ancestry": "muggleborn"
      },
      {
        "name": "Draco Malfoy",
        "house": "Slytherin",
        "yearOfBirth": 1980,
        "wizard": true,
        "ancestry": "pure-blood"
      },
      {
        "name": "Albus Dumbledore",
        "house": "Gryffindor",
        "yearOfBirth": 0,
        "wizard": true,
        "ancestry": "half-blood"
      },
      {
        "name": "Lord Voldemort",
        "house": "Slytherin",
        "yearOfBirth": 1926,
        "wizard": true,
        "ancestry": "half-blood"
      }
    ];

    deepStrictEqual(result, expected);
  }
})();