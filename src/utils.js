import bcrypt from "bcrypt";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

const config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: config });

export const format = (input) => {
  if (typeof input === "number") {
    return new Intl.NumberFormat("es-Ar", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(input);
  }
  if (typeof input === "string") {
    return input.toUpperCase();
  }
};

export const subtotal = (price, quantity) => {
  return format(price * quantity);
};

export default class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
