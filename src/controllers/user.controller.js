import { userService } from "../services/user.service.js";
import bcrypt from "bcrypt";

class UserController {
  constructor(service) {
    this.service = service;
  }
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      const token = this.service.generateToken(user);
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  register = async (req, res, next) => {
    try {
      const { first_name, last_name, email, password, age } = req.body;
      await this.service.register({
        first_name,
        last_name,
        email,
        password,
        age,
      });
      res.status(200).redirect("/login");
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res, next) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };
  current = async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };
  changePassword = async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const userPayload = await this.service.verifyToken(token);
      if (!userPayload) {
        return res.status(400).json({ error: "Invalid token" });
      }
      const userdb = await this.service.getByEmail(userPayload.email);
      const { email } = userdb;
      const areSamePasswords = await bcrypt.compare(password, userdb.password);
      if (areSamePasswords) {
        return res.redirect(`/reset-password/${token}?error=same`);
      }
      await this.service.changePassword(email, password);
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
