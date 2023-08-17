// import { v4 as uuid } from 'uuid';
import { randomUUID as uuid } from 'crypto';

import Product from "./product.js";

export default class Cart {
  constructor({ at, products }) {
    this.id = uuid();
    this.at = at;
    this.products = this.removeUndefinedProps(products);
    this.total = this.getCartPrice()
  }

  removeUndefinedProps(products) {
    const productsEntities = products
      .filter(product => !!Reflect.ownKeys(product).length) // se for 0 => !!0 == false || !!1 == true
      .map(product => new Product(product));


    /**
     * $ a = {a: undefined, b: 2, c: null}
     * $ JSON.stringify(a) => '{"b:2","c":null}'
     * $ JSON.parse(JSON.stringify(productsEntities)) => { b: 2, c: null }
     */
    return JSON.parse(JSON.stringify(productsEntities));
  }

  getCartPrice() {
    return this.products
      .map(product => product.price) // roda em toda a coleção
      .reduce((prev, next) => prev + next, 0); // roda em toda a coleção
  }
}