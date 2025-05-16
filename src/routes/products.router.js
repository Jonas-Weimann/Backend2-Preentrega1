import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { passportCall } from "../middlewares/passport.call.js";
import { checkRole } from "../middlewares/check.role.js";

const router = Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = productController;

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:pid")
  .get(passportCall("current"), getProductById)
  .put(passportCall("current"), checkRole("admin"), updateProduct)
  .delete(passportCall("current"), checkRole("admin"), deleteProductById);

export default router;
