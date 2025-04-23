import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";
import { passportCall } from "../middlewares/passport.call.js";

const router = Router();
const {
  renderLanding,
  renderProducts,
  renderProductById,
  renderCartById,
  renderLogin,
  renderRegister,
} = viewsController;

router.get("/", renderLanding);
router.get("/products", renderProducts);
router.get("/products/:pid", passportCall("current"), renderProductById);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/carts/:cid", passportCall("current"), renderCartById);

export default router;
