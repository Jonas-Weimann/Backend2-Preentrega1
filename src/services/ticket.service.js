import { ticketDao } from "../daos/mongodb/ticket.dao.js";
import { cartService } from "./cart.service.js";
import CustomError from "../utils.js";

class TicketService {
  constructor(dao) {
    this.dao = dao;
  }
  async generateTicket(user) {
    try {
      const cart = await cartService.getById(user.cart);
      if (!cart) throw new CustomError("Cart not found", 404);
      const ticket = await this.dao.create({
        code: `tk_${Math.random() * 100000}`,
        purchase_datetime: new Date().toLocaleString(),
        amount: cart.total,
        purchaser: user.email,
      });
      await cartService.emptyCart(user.cart);
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}

export const ticketService = new TicketService(ticketDao);
