import { ProductModel } from "./models/product.model.js";
import { CartModel } from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js";

export class CartDao extends MongoDao {
  async getAllFromCart(id) {
    try {
      const result = await this.model
        .findById(id)
        .populate("products.product")
        .lean();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addToCart(id, productId) {
    try {
      const cart = await this.model.findById(id);
      const product = await ProductModel.findById(productId);
      if (!cart || !product) return null;

      const productInCart = cart.products.find(
        (prod) => String(prod.product) === String(productId)
      );

      if (productInCart) {
        productInCart.quantity++;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      const result = await this.update(id, cart);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeFromCart(id, productId) {
    try {
      const cart = await this.model.findById(id);
      const product = await ProductModel.findById(productId);
      if (!cart || !product) return null;

      const productInCart = cart.products.find(
        (prod) => String(prod.product) === String(productId)
      );

      if (productInCart) {
        if (productInCart.quantity > 1) {
          productInCart.quantity--;
        } else {
          cart.products = cart.products.filter(
            (prod) => String(prod.product) !== String(productId)
          );
        }
      } else {
        return null;
      }

      const result = await this.update(id, cart);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeAllFromCart(id, productId) {
    try {
      const cart = await this.model.findById(id);
      const product = await ProductModel.findById(productId);
      if (!cart || !product) return null;

      cart.products = cart.products.filter(
        (prod) => String(prod.product) !== String(productId)
      );

      const result = await this.update(id, cart);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async emptyCart(id) {
    try {
      const cart = await this.model.findById(id);
      if (!cart) return null;

      cart.products = [];

      const result = await this.update(id, cart);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(id, products) {
    try {
      const cart = await this.model.findById(id);
      if (!cart) return null;

      cart.products = products;
      const result = await this.update(id, cart);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantity(id, productId, quantity) {
    try {
      const cart = await this.model.findById(id);
      const product = await ProductModel.findById(productId);
      if (!cart || !product) return null;

      const productInCart = cart.products.find(
        (prod) => String(prod.product) === String(productId)
      );

      if (productInCart) {
        productInCart.quantity = quantity;
      } else {
        return null;
      }

      const result = await this.update(id, cart);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartDao = new CartDao(CartModel);
