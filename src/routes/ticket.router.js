import { Router } from "express";
import { ticketController } from "../controllers/ticket.controller.js";
import { emailController } from "../controllers/email.controller.js";
import { passportCall } from "../middlewares/passport.call.js";

const router = Router();
const { generateTicket } = ticketController;
const { sendConfirmationEmail } = emailController;

router.post(
  "/purchase",
  passportCall("current"),
  generateTicket,
  sendConfirmationEmail
);

export default router;
