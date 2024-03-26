import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order, getOrders } from "lib/order";
import * as methods from "micro-method-router";
const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const userOrders = await getOrders(token.userId);
      const orders = [];
      for (let order of userOrders.docs) {
        orders.push(order.data());
      }
      res.status(200).send(orders);
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
export default authMiddleware(handler);
