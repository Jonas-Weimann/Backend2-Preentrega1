import { ticketService } from "../services/ticket.service.js";

class TicketController {
  constructor(service) {
    this.service = service;
  }

  generateTicket = async (req, res, next) => {
    try {
      const { user } = req;
      const ticket = await this.service.generateTicket(user);
      res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
      next(error);
    }
  };
}

export const ticketController = new TicketController(ticketService);
