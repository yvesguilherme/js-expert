const { evaluateRegex } = require('./util');

/**
 * O objetivo do Fluent API é executar tarefas
 * como um pipeline, step by step e no fim,
 * chamar o build. Muito similar ao padrão BUILDER.
 * A diferença é que aqui é sobre PROCESSOR, o Builder é sobre CONSTRUIÇÃO de
 * objetos.
 */
class TextProcessorFluentAPI {
  // propriedade privada!
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    /**
     *  ?<=     Fala que vai extrar os dados que virão depois desse grupo
     *  [contratante|contratada]   ou um ou outro, (e tem a flag no fim da expressão
     * para pegar minúsculo e maiúsculo)
     *  :\s{1}  Vai procurar o caractere literal do dois pontos seguindo de um espaço
     * TUDO ACIMA FICA DENTRO DE UM PARÊNTESES PARA FALAR "VAMOS PEGAR DAÍ PRA FRENTE"
     * 
     *  (?!\s)  Negative look around, vai ignorar os contratantes do fim do documento.
     * (que só tem espaço a frente deles).
     *  .*\n    Pega qualquer coisa até o primeiro \n
     *  .*?     non greety, esse ? faz com que ele pare na primeira recorrência, assim ele
     * evita ficar em loop.
     *  $       informar que a pesquia acaba no fim da linha.
     *  g       global
     *  m       multiline
     *  i       case insensitive
     */

    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi);

    /**
     * Faz o match para encontrar a string inteira que contém os dados que precisamos.
     */
    const onlyPerson = this.#content.match(matchPerson);
    // console.log('onlyPerson', matchPerson.test(this.#content));
    this.#content = onlyPerson;
    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map(line => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content
      .map(
        line => line.map(item => item.replace(trimSpaces, ''))
      );

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;