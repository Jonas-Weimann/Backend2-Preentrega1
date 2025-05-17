import dotenv from "dotenv";

const ENV = process.argv[2] || "dev";
dotenv.config({
  path:
    ENV === "prd" ? "./.env.prd" : ENV === "qas" ? "./.env.qas" : "./.env.dev",
});

export default {
  ENV,
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  TWILIO_WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER,
  PORT_GOOGLE: process.env.PORT_GOOGLE,
  USER_GOOGLE: process.env.USER_GOOGLE,
  PASS_GOOGLE: process.env.PASS_GOOGLE,
  HOME_URL: process.env.HOME_URL,
};
