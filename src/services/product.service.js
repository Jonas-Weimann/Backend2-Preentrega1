import CustomError from "../utils.js";
import { productDao } from "../daos/mongodb/product.dao.js";

class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async ({ limit = 10, page = 1, sort, query }) => {
    try {
      //Obtengo todos los productos paginados y filtrados según la query
      let products = await this.dao.paginate(query ? JSON.parse(query) : {}, {
        page: parseInt(page),
        limit: parseInt(limit),
      });

      if (!products) {
        throw new CustomError("No products found", 404);
      }

      //Limito los resultados al valor de limit dentro de la misma página
      products.docs = products.docs.slice(0, parseInt(limit));

      //Ordeno los resultados por precio según el valor de sort
      products.docs = products.docs.sort((a, b) => {
        return sort == "asc"
          ? a.price - b.price
          : sort == "desc"
          ? b.price - a.price
          : 0;
      });

      //Creo los links de paginación
      products["prevLink"] = products.hasPrevPage
        ? `/?limit=${limit}&page=${products.prevPage}&sort=${
            sort || ""
          }&query=${query || ""}`
        : null;

      products["nextLink"] = products.hasNextPage
        ? `/?limit=${limit}&page=${products.nextPage}&sort=${
            sort || ""
          }&query=${query || ""}`
        : null;

      //Cambio el nombre de docs a payload
      products["payload"] = products.docs;

      delete products.docs;

      return products;
    } catch (error) {
      throw error;
    }
  };

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new CustomError("Product not found", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const producto = req.body;
      const response = Array.isArray(producto)
        ? await this.dao.createMany(producto)
        : await this.dao.create(producto);
      if (!response) throw new CustomError("Error creating product", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  createMany = async (body) => {
    try {
      const response = await this.dao.createMany(body);
      if (!response) throw new CustomError("Error creating products", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteAll = async () => {
    try {
      const response = await this.dao.deleteAll();
      if (!response) throw new CustomError("Error deleting products", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const productService = new ProductService(productDao);
