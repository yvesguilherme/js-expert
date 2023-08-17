export default class CartPriceNew {
  constructor({ products }) {
    this.products = products;
    this.total = this.getCartPrice()
  }

  getCartPrice() {
    let price = 0;

    for (const product of this.products) {
      price += product.price;
    }

    return price;
  }
}