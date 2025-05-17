import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";
import { passportCall } from "../middlewares/passport.call.js";
import { validateLogOut } from "../middlewares/validate.logout.js";

const router = Router();
const {
  renderLanding,
  renderProducts,
  renderProductById,
  renderCartById,
  renderLogin,
  renderRegister,
  renderResetPassword,
  renderProfile,
} = viewsController;

router.get("/", renderLanding);
router.get("/profile", passportCall("current"), renderProfile);
router.get("/products", passportCall("current"), renderProducts);
router.get("/products/:pid", passportCall("current"), renderProductById);
router.get("/login", validateLogOut, renderLogin);
router.get("/register", validateLogOut, renderRegister);
router.get("/carts/:cid", passportCall("current"), renderCartById);
router.get("/reset-password/:token", renderResetPassword);

export default router;
