import { TicketModel } from "./models/ticket.model.js";
import MongoDao from "./mongo.dao.js";

class TicketDaoMongo extends MongoDao {
  constructor(model) {
    super(model);
  }
  getAll = async () => {
    try {
      const tickets = await this.model.find();
      return tickets;
    } catch (error) {
      throw new Error(error);
    }
  };
  getById = async (id) => {
    try {
      const ticket = await this.model.findById(id);
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };
  create = async (ticket) => {
    try {
      const newTicket = await this.model.create(ticket);
      return newTicket;
    } catch (error) {
      throw new Error(error);
    }
  };
  update = async (id, ticket) => {
    try {
      const updatedTicket = await this.model.findByIdAndUpdate(id, ticket, {
        new: true,
      });
      return updatedTicket;
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      const deletedTicket = await this.model.findByIdAndDelete(id);
      return deletedTicket;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const ticketDao = new TicketDaoMongo(TicketModel);
