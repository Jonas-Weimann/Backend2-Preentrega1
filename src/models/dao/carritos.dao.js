import { Common } from "./common.dao.js";
import { ProductosModel } from "../productos.model.js";

export class CarritosDao extends Common {
  async getAllFromCart(id) {
    try {
      //Busco el carrito y lo pueblo con los productos
      const result = await this.model.findById(id).populate("products.product");
      return result;
    } catch (e) {
      return null;
    }
  }

  async addToCart(id, idProducto) {
    try {
      //Busco el carrito y el producto
      const carrito = await this.model.findById(id);
      const producto = await ProductosModel.findById(idProducto);
      if (!carrito || !producto) return null;

      //Busco el producto en el carrito
      const productoEnCarrito = carrito.products.find(
        (prod) => String(prod.product) === String(idProducto)
      );

      //Incremento su cantidad o lo agrego a products
      if (productoEnCarrito) {
        productoEnCarrito.quantity++;
      } else {
        carrito.products.push({ product: idProducto, quantity: 1 });
      }
      //Actualizo el carrito
      const result = await this.update(id, carrito);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async removeFromCart(id, idProducto) {
    try {
      //Busco el carrito y el producto
      const carrito = await this.model.findById(id);
      const producto = await ProductosModel.findById(idProducto);
      if (!carrito || !producto) return null;

      //Busco el producto en el carrito
      const productoEnCarrito = carrito.products.find(
        (prod) => String(prod.product) === String(idProducto)
      );

      //Decremento su cantidad o lo elimino de products
      if (productoEnCarrito) {
        if (productoEnCarrito.quantity > 1) {
          productoEnCarrito.quantity--;
        } else {
          //Elimino el producto si su quantity llega a 0
          carrito.products = carrito.products.filter(
            (prod) => String(prod.product) !== String(idProducto)
          );
        }
      } else {
        return null;
      }
      //Actualizo el carrito
      const result = await this.update(id, carrito);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async removeAllFromCart(id, idProducto) {
    try {
      //Busco el carrito y el producto
      const carrito = await this.model.findById(id);
      const producto = await ProductosModel.findById(idProducto);
      if (!carrito || !producto) return null;

      //Elimino el producto del carrito sin importar su quantity
      carrito.products = carrito.products.filter(
        (prod) => String(prod.product) !== String(idProducto)
      );
      carrito.products = [];

      //Actualizo el carrito
      const result = await this.update(id, carrito);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async emptyCart(id) {
    try {
      //Busco el carrito
      const carrito = await this.model.findById(id);
      if (!carrito) return null;
      //Vacío el carrito
      carrito.products = [];
      //Actualizo el carrito
      const result = await this.update(id, carrito);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateQuantity(id, idProducto, quantity) {
    try {
      //Busco el carrito y el producto
      const carrito = await this.model.findById(id);
      const producto = await ProductosModel.findById(idProducto);
      if (!carrito || !producto) return null;

      //Busco el producto en el carrito
      const productoEnCarrito = carrito.products.find(
        (prod) => String(prod.product) === String(idProducto)
      );

      //Actualizo la cantidad del producto
      if (productoEnCarrito) {
        productoEnCarrito.quantity = quantity;
      } else {
        return null;
      }
      //Actualizo el carrito
      const result = await this.update(id, carrito);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
