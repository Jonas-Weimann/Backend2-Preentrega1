import { UserModel } from "./models/user.model.js";
import MongoDao from "./mongo.dao.js";

class UserDaoMongo extends MongoDao {
  constructor(model) {
    super(model);
  }
  getByEmail = async (email) => {
    try {
      const user = await this.model.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  login = async (email, password) => {
    try {
      const user = await this.model.findOne({ email, password });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userDao = new UserDaoMongo(UserModel);
