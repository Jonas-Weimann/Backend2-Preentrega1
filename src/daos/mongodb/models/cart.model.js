import { Schema, model } from "mongoose";
import paginateV2 from "mongoose-paginate-v2";

const carritoCollection = "Carritos";
const carritoSchema = new Schema({
  //POPULATE
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Productos",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

carritoSchema.plugin(paginateV2);

export const CarritosModel = model(carritoCollection, carritoSchema);
