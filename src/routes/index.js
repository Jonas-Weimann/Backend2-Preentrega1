import { Router } from "express";
import sessionsRouter from "./sessions.router.js";
import cartsRouter from "./carts.router.js";
import productsRouter from "./products.router.js";

const router = Router();

router.use("/sessions", sessionsRouter);
router.use("/carts", cartsRouter);
router.use("/products", productsRouter);

export default router;
