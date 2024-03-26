import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { Order, getOrderById } from "lib/order";
import * as methods from "micro-method-router";
import * as yup from "yup";
let querySchema = yup.object().shape({
  orderId: yup.string().required(),
});
const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      querySchema.noUnknown();
      querySchema.validateSync(req.query, { stripUnknown: false });
      const { orderId } = req.query;
      const order = await getOrderById(orderId);
      res.status(200).send(order.data());
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
export default authMiddleware(handler);
