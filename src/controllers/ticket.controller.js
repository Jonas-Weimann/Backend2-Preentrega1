import { cartService } from "../services/cart.service.js";
import { ticketService } from "../services/ticket.service.js";

class TicketController {
  constructor(service) {
    this.service = service;
  }

  generateTicket = async (req, res, next) => {
    try {
      const { user } = req;
      const ticket = await this.service.generateTicket(user);
      req.ticket = ticket;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const ticketController = new TicketController(ticketService);
