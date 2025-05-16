import { Schema, model } from "mongoose";
import paginateV2 from "mongoose-paginate-v2";

const cartCollection = "Carritos";
const cartSchema = new Schema({
  //POPULATE
  products: [
    {
      _id: false,
      product: {
        type: Schema.Types.ObjectId,
        ref: "Productos",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

cartSchema.plugin(paginateV2);

export const CartModel = model(cartCollection, cartSchema);
