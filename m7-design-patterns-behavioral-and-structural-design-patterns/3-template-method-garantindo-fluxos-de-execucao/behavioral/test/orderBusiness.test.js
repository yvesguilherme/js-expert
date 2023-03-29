import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import Order from '../src/entities/order.js';
import OrderBusiness from '../src/business/orderBusiness.js';

describe.only('#Test suite for Template Method design pattern.', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  });

  describe('#OrderBusiness', () => {
    test('Execution Order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }]
      });

      const orderBusiness = new OrderBusiness();
      /**
       * Todos devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução.
       * Se algum esquecer de chamar a função de validação, pode quebrar todo o sistema.
       */
      const isValid = orderBusiness._validateRequiredFields(order);
      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });

    test('Execution Order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }]
      });

      const orderBusiness = new OrderBusiness();
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );
      /**
       * Com template method, a sequência de passos é sempre executada, evitando
       * a replicação de lógica.
       */
      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});