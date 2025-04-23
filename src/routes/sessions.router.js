import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { passportCall } from "../middlewares/passport.call.js";

const router = Router();

const { login, register, logout, current } = userController;

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/current", passportCall("current"), current);

export default router;
