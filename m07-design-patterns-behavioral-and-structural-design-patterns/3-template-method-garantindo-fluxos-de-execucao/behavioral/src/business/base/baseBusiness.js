import { NotImplementedException } from '../../util/exceptions.js';

export default class BaseBusiness {
  // Implementação ficará nos filhos.
  _validateRequiredFields() {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }

  // Implementação ficará nos filhos.
  _create() {
    throw new NotImplementedException(this._create.name);
  }

  /**
   * Padrão do Martin Fowler.
   * A proposta deste padrão é garantir um fluxo de métodos, definindo uma
   * sequência a ser executada.
   * 
   * Esse 'create' é a implementação efetiva do Template Method.
   */
  create(data) {
    const isValid = this._validateRequiredFields(data);

    if (!isValid) {
      throw new Error(`Invalid data!`);
    }

    return this._create(data);
  }
}