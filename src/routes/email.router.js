import { Router } from "express";
import { emailController } from "../controllers/email.controller.js";
import { passportCall } from "../middlewares/passport.call.js";

const router = Router();

const { sendRegistrationEmail, sendConfirmationEmail, sendRecoveryEmail } =
  emailController;

router.post("/registerSuccess", sendRegistrationEmail);
router.post("/purchaseSuccess", passportCall("current"), sendConfirmationEmail);
router.post("/recovery", passportCall("current"), sendRecoveryEmail);

export default router;
