import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

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
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProductById);

export default router;
