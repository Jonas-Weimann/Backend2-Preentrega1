import { cartService } from "../services/cart.service.js";

class CartController {
  constructor(service) {
    this.service = service;
  }
  getAllCarts = async (req, res, next) => {
    try {
      const response = await this.service.getAllCarts();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  getAllFromCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.service.getAllFromCart(cid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  createCart = async (req, res, next) => {
    try {
      const cart = req.body;
      const response = await this.service.create(cart);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
  addToCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const response = await this.service.addToCart(cid, pid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  deleteFromCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const response = await this.service.deleteFromCart(cid, pid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  emptyCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.service.emptyCart(cid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  updateCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const products = req.body;
      const response = await this.service.update(cid, { products });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  updateQuantity = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const quantity = req.body;
      const response = await this.service.updateQuantity(cid, pid, quantity);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController(cartService);
