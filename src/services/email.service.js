import { createTransport } from "nodemailer";
import config from "../config/config.js";
import {
  registerTemplateHtml,
  purchaseTemplateHtml,
  recoverPasswordHtml,
} from "../utils.js";

export const transporter = createTransport({
  service: "gmail",
  port: config.PORT_GOOGLE,
  auth: {
    user: config.USER_GOOGLE,
    pass: config.PASS_GOOGLE,
  },
});

export const registrationEmail = (destination, name) => {
  return {
    from: config.USER_GOOGLE,
    to: destination,
    subject: "Bienvenido a EXPRINTIFY",
    html: registerTemplateHtml(name),
  };
};

export const confirmationEmail = (destination, name) => {
  return {
    from: config.USER_GOOGLE,
    to: destination,
    subject: "Tu compra fue realizada con exito",
    html: purchaseTemplateHtml(name),
  };
};

export const recoveryEmail = (destination, token) => {
  return {
    from: config.USER_GOOGLE,
    to: destination,
    subject: "Recupera tu contraseña",
    html: recoverPasswordHtml(token),
  };
};
