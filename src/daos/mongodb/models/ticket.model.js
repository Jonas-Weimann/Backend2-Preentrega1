import { Schema, model } from "mongoose";

const ticketCollection = "Tickets";

const TicketSchema = new Schema({
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
});

export const TicketModel = model(ticketCollection, TicketSchema);
