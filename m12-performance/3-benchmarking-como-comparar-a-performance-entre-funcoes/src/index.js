import database from "../database.js";
import Cart from "./entities/cart.js";

const cart = new Cart(database);

console.log(cart);