import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    max: 100,
  },
  last_name: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 100,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    default: "user",
    max: 100,
  },
});

export const UserModel = mongoose.model(userCollection, UserSchema);
