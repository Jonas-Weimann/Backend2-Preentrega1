import { Common } from "./common.dao.js";

export class ProductosDao extends Common {
  async createMany(object) {
    try {
      const result = await this.model.insertMany(object);
      return result;
    } catch (e) {
      return null;
    }
  }
}
