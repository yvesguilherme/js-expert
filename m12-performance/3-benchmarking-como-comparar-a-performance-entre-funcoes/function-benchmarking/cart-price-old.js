export default class CartPriceOld {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice()
  }


  getCartPrice() {
    return this.products
      .map(product => product.price) // roda em toda a coleção
      .reduce((prev, next) => prev + next, 0); // roda em toda a coleção
  }
}