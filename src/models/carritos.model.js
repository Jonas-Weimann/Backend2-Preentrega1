import { Schema, model } from "mongoose";
import { paginateV2 } from "mongoose-paginate-v2";

const carritoCollection = "Carritos";
const carritoSchema = new Schema({
  products: { type: Array, default: [] },
});

carritoSchema.plugin(paginateV2);

export const CarritoModel = model(carritoCollection, carritoSchema);
