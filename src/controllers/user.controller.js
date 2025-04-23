import { userService } from "../services/user.service.js";

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
      req.session.destroy();
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
}

export const userController = new UserController(userService);
