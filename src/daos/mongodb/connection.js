import { connect } from "mongoose";
import "dotenv/config";

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_URI, { dbName: "Ecommerce" });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};
