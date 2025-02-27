import { Schema, model } from "mongoose";
import { paginateV2 } from "mongoose-paginate-v2";

const prodcutoCollection = "Productos";
const productoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array, default: [] },
});

productoSchema.plugin(paginateV2);

export const ProductoModel = model(prodcutoCollection, productoSchema);
