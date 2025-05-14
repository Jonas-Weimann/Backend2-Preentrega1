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
};
