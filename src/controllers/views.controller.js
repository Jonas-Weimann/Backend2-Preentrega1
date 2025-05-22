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
      const cid = req.user.cart;
      const result = await productService.getAll({ limit, page, sort, query });

      const { payload, prevLink, nextLink } = result;
      res.render("index", {
        products: JSON.parse(JSON.stringify(payload)),
        format,
        currentPage: page || 1,
        prevPage: prevLink,
        nextPage: nextLink,
        cid: cid,
      });
    } catch (error) {
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
      const { user } = req.body;
      const cart = await cartService.getAllFromCart(cid);
      const products = (cart.products || []).map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      const total = cart.total || 0;

      res.render("cart", {
        subtotal,
        format,
        cart: cid,
        products,
        user: user,
        total: total,
      });
    } catch (error) {
      res.render("error", { error: error.message });
    }
  }
  renderResetPassword(req, res) {
    const { token } = req.params;
    res.render("resetPassword", { token });
  }
  renderProfile(req, res) {
    const user = req.user;
    res.render("profile", { user });
  }
}

export const viewsController = new ViewsController();
