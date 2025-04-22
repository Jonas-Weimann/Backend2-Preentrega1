import { productService } from "../services/product.service.js";

class ProductController {
  constructor(service) {
    this.service = service;
  }
  getAllProducts = async (req, res, next) => {
    try {
      const { limit, page, sort, query } = req.query;
      const response = await this.service.getAll({ limit, page, sort, query });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  getProductById = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.getById(pid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  createProduct = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
  updateProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.update(pid, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  deleteProductById = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.delete(pid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  deleteAllProducts = async (req, res, next) => {
    try {
      const response = await this.service.deleteAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productService);
