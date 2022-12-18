const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

/**
 * O padrão de projeto Facade é estrutural que tem o objetivo em
 * abstrair as execuções complexas de outras classes, é extremamente
 * utilizado em conjunto com outros padrões.
 */
class TextProcessorFacade {
  #textProcessorFluentAPI;

  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;