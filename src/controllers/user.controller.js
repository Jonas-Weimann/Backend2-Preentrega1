import { userService } from "../services/user.service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }
  login = async (req, res, next) => {
    try {
      const id = req.session.passport.user;
      const user = await userService.getById(id);
      const token = this.service.generateToken(user);
      res.cookie("token", token, { httpOnly: true }).redirect("/api/profile");
    } catch (error) {
      next(error);
    }
  };
  register = async (req, res, next) => {
    try {
      res.status(200).redirect("/api/");
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/api/");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export const userController = new UserController(userService);
