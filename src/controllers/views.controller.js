import { cartService } from "../services/cart.service.js";
import { productService } from "../services/product.service.js";
import { format, subtotal } from "../utils.js";

export class ViewsController {
  renderLanding(req, res) {
    res.render("landing", {});
  }

  renderLogin(req, res) {
    res.render("login", {});
  }

  renderRegister(req, res) {
    res.render("register", {});
  }

  async renderProducts(req, res) {
    try {
      const { limit, page, sort, query } = req.query;

      const result = await productService.getAll({ limit, page, sort, query });

      const { payload, prevLink, nextLink } = result;

      res.render("index", {
        products: JSON.parse(JSON.stringify(payload)),
        format,
        prevPage: prevLink,
        nextPage: nextLink,
      });
    } catch (error) {
      console.log(error);
      res.render("error", { error: error.message });
    }
  }

  async renderProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await productService.getById(pid);
      if (!product) {
        return res.render("error", { error: "Product not found" });
      }
      res.render("product", {
        product: JSON.parse(JSON.stringify(product)),
        cid: req.user.cart,
      });
    } catch (error) {
      res.render("error", { error: error.message });
    }
  }

  async renderCartById(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getAllFromCart(cid);

      const products = (cart.products || []).map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

      res.render("cart", {
        subtotal,
        cart: cid,
        products,
      });
    } catch (error) {
      res.render("error", { error: error.message });
    }
  }
}

export const viewsController = new ViewsController();
