export default class MongoDao {
  constructor(model) {
    this.model = model;
  }

  create = async (body) => {
    try {
      const result = await this.model.create(body);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  getAll = async () => {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, body) => {
    try {
      const result = await this.model.findByIdAndUpdate(id, body, {
        new: true,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteAll = async () => {
    try {
      const result = await this.model.deleteMany({});
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
