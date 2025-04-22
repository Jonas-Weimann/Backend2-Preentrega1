import { Router } from "express";
import userRouter from "./users.router.js";
import cartsRouter from "./carts.router.js";
import productsRouter from "./products.router.js";

const router = Router();

router.use("/users", userRouter);
router.use("/carts", cartsRouter);
router.use("/products", productsRouter);

export default router;
