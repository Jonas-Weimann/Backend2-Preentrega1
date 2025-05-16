import { Router } from "express";
import { emailController } from "../controllers/email.controller.js";
import { passportCall } from "../middlewares/passport.call.js";

const router = Router();

const { sendRegistrationEmail } = emailController;

router.post("/registerSuccess", passportCall("current"), sendRegistrationEmail);

export default router;
