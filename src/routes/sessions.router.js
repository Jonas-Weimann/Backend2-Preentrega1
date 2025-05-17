import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { passportCall } from "../middlewares/passport.call.js";
import { validateLogOut } from "../middlewares/validate.logout.js";

const router = Router();

const { login, register, logout, current, changePassword } = userController;

router.post("/login", validateLogOut, login);

router.post("/register", validateLogOut, register);

router.post("/logout", logout);

router.get("/current", passportCall("current"), current);

router.post("/recover-password", changePassword);

export default router;
