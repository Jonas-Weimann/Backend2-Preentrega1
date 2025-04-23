import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

const {
  getAllCarts,
  getAllFromCart,
  createCart,
  addToCart,
  deleteFromCart,
  emptyCart,
  updateCart,
  updateQuantity,
} = cartController;

router.get("/", getAllCarts);

router.get("/:cid", getAllFromCart);

router.post("/", createCart);

router.post("/:cid/products/:pid", addToCart);

router.delete("/:cid/products/:pid", deleteFromCart);

router.delete("/:cid", emptyCart);

router.put("/:cid", updateCart);

router.put("/:cid/products/:pid", updateQuantity);

export default router;
