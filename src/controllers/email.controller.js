import {
  registrationEmail,
  confirmationEmail,
  transporter,
} from "../services/email.service.js";

class EmailController {
  constructor(transporter) {
    this.transporter = transporter;
  }
  sendRegistrationEmail = async (req, res, next) => {
    try {
      const { user } = req;
      const { email, first_name } = user;
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
}

export const emailController = new EmailController(transporter);
