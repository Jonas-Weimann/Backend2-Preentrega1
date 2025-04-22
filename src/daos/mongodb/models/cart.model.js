import { Schema, model } from "mongoose";
import paginateV2 from "mongoose-paginate-v2";

const cartCollection = "Carritos";
const cartSchema = new Schema({
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

cartSchema.plugin(paginateV2);

export const CartModel = model(cartCollection, cartSchema);
