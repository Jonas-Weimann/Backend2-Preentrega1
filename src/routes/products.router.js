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

router.get("/", getAllProducts);

router.get("/:pid", getProductById);

router.post("/", createProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProductById);

export default router;
