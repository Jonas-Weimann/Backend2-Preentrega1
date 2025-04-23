import { cartDao } from "../daos/mongodb/cart.dao.js";
import CustomError from "../utils.js";

class CartService {
  constructor(dao) {
    this.dao = dao;
  }
  getAllCarts = async () => {
    try {
      const response = await this.dao.getAll();
      if (!response) throw new CustomError("No carts found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  getAllFromCart = async (cid) => {
    try {
      const response = await this.dao.getAllFromCart(cid);
      if (!response) throw new CustomError("Cart not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  create = async (cart) => {
    try {
      const response = await this.dao.create(cart);
      if (!response) throw new CustomError("Error creating cart", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  addToCart = async (cid, pid) => {
    try {
      const response = await this.dao.addToCart(cid, pid);
      if (!response) throw new CustomError("Error adding product to cart", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  deleteFromCart = async (cid, pid) => {
    try {
      const response = await this.dao.removeFromCart(cid, pid);
      if (!response)
        throw new CustomError("Error deleting product from cart", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  emptyCart = async (cid) => {
    try {
      const response = await this.dao.emptyCart(cid);
      if (!response) throw new CustomError("Error emptying cart", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  updateCart = async (cid, products) => {
    try {
      const response = await this.dao.updateCart(cid, products);
      if (!response) throw new CustomError("Error updating cart", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  updateQuantity = async (cid, pid, quantity) => {
    try {
      const response = await this.dao.updateQuantity(cid, pid, quantity);
      if (!response)
        throw new CustomError("Error updating product quantity", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  deleteAll = async () => {
    try {
      const response = await this.dao.deleteAll();
      if (!response) throw new CustomError("Error deleting carts", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const cartService = new CartService(cartDao);
