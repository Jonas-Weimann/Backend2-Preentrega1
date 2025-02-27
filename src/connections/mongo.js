import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongo = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_KEY, { dbName: "Ecommerce" })
      .then(() => console.log("Conectado a la base de datos!"));
  } catch (e) {
    console.log("Error conectando a mongo: ", e.message);
  }
};
