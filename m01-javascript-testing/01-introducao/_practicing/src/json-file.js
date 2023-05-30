const { readFile } = require('fs/promises');

const { error } = require('./constants');

const DEFAULT_OPTION = {
  maxObjects: 5,
  keys: ['name', 'house', 'yearOfBirth', 'wizard', 'ancestry']
}

class JsonFile {
  static async readJson(filePath) {
    const content = await JsonFile.getFileContent(filePath);
    const validation = JsonFile.isValid(content);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return JSON.parse(content);
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString('utf8');
  }

  static isValid(jsonString, options = DEFAULT_OPTION) {
    const json = JSON.parse(jsonString);

    if (!json.length || json.length > 5) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      };
    }

    for (const key of options.keys) {
      for (const obj of json) {
        if (!obj.hasOwnProperty(key)) {
          return {
            error: error.FILE_KEYS_ERROR_MESSAGE,
            valid: false
          };
        }
      }
    }

    return {
      valid: true
    }
  }
}

// ; (async () => {
//   // const result = await JsonFile.readJson('./../mocks/empty-json-invalid.json');
//   // const result = await JsonFile.readJson('./../mocks/invalid-key.json');
//   // const result = await JsonFile.readJson('./../mocks/six-items-invalid.json');
//   const result = await JsonFile.readJson('./../mocks/five-items-valid.json');

//   console.log('result', result);
// })();

module.exports = JsonFile;