import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { passportCall } from "../middlewares/passport.call.js";
import { checkRole } from "../middlewares/check.role.js";

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

router.get("/", passportCall("current"), checkRole("admin"), getAllCarts);

router.get("/:cid", getAllFromCart);

router.post("/", createCart);

router.post(
  "/:cid/products/:pid",
  passportCall("current"),
  checkRole("user"),
  addToCart
);

router.delete("/:cid/products/:pid", passportCall("current"), deleteFromCart);

router.delete("/:cid", passportCall("current"), emptyCart);

router.put("/:cid", passportCall("current"), updateCart);

router.put("/:cid/products/:pid", passportCall("current"), updateQuantity);

export default router;
