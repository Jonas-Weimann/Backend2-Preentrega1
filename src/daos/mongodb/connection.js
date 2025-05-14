import { connect } from "mongoose";
import config from "../../config/config.js";

export const initMongoDB = async () => {
  try {
    await connect(config.MONGODB_URI, { dbName: "Ecommerce" });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};
