import { Router } from "express";
import sessionsRouter from "./sessions.router.js";
import cartsRouter from "./carts.router.js";
import productsRouter from "./products.router.js";
import emailRouter from "./email.router.js";
import ticketRouter from "./ticket.router.js";

const router = Router();

router.use("/sessions", sessionsRouter);
router.use("/carts", cartsRouter);
router.use("/products", productsRouter);
router.use("/email", emailRouter);
router.use("/ticket", ticketRouter);

export default router;
