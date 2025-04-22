import CustomError, { createHash, isValidPassword } from "../utils.js";
import { userDao } from "../daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

class UserService {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => {
    try {
      const response = await this.dao.getAll();
      return response;
    } catch (error) {
      throw error;
    }
  };
  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  getByEmail = async (email) => {
    try {
      const response = await this.dao.getByEmail(email);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  create = async (body) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Error creating user", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("User not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };
  login = async (email, password) => {
    try {
      const existingUser = await this.dao.getByEmail(email);
      if (!existingUser) throw new CustomError("Invalid credentials", 401);
      const passwordValid = isValidPassword(existingUser, password);
      if (!passwordValid) throw new CustomError("Invalid credentials", 401);
      return existingUser;
    } catch (error) {
      throw error;
    }
  };
  register = async (body) => {
    try {
      const { email, password } = body;
      const existingUser = await this.dao.getByEmail(email);
      if (existingUser) throw new CustomError("User already exists", 400);
      const hashedPassword = createHash(password);
      const userData = { ...body, password: hashedPassword };
      const newUser = await this.dao.create(userData);
      return newUser;
    } catch (error) {
      throw error;
    }
  };
  generateToken = (user) => {
    const payload = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  };
}

export const userService = new UserService(userDao);
