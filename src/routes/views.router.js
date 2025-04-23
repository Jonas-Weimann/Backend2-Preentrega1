import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";

const router = Router();
const { renderLanding, renderProducts, renderProductById, renderCartById } =
  viewsController;

router.get("/", renderLanding);
router.get("/products", renderProducts);
router.get("/products/:pid", renderProductById);
router.get("/carts/:cid", renderCartById);

export default router;
