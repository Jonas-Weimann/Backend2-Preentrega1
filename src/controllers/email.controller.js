import {
  registrationEmail,
  confirmationEmail,
  recoveryEmail,
  transporter,
} from "../services/email.service.js";
import { userService } from "../services/user.service.js";

class EmailController {
  constructor(transporter) {
    this.transporter = transporter;
  }
  sendRegistrationEmail = async (req, res, next) => {
    try {
      const { email, first_name } = req.body;
      const response = await this.transporter.sendMail(
        registrationEmail(email, first_name)
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  sendConfirmationEmail = async (req, res, next) => {
    try {
      const { user } = req;
      const { email, first_name } = user;
      const response = await this.transporter.sendMail(
        confirmationEmail(email, first_name)
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  sendRecoveryEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.getByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = userService.generateToken(user);
      const response = await this.transporter.sendMail(
        recoveryEmail(email, token)
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const emailController = new EmailController(transporter);
