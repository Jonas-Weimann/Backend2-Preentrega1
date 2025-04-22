import { CartDao } from "../daos/mongodb/cart.dao";

class CartService {
  constructor(dao) {
    this.dao = dao;
  }
}

export const cartService = new CartService(CartDao);
