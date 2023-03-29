import OrderBusiness from './business/orderBusiness.js';
import Order from './entities/order.js';

const order = new Order({
  customerId: 'yves123',
  amount: 112.322,
  products: [{ description: 'shampoo' }]
});

const orderBusiness = new OrderBusiness();
console.info('orderCreated', orderBusiness.create(order));