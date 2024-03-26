import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import * as methods from "micro-method-router";
import { newOrder } from "lib/controllers/order";

const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse, token) {
    if (!req.query.productId) {
      res.status(404).json({ error: "Product not found" });
    }
    const order = await newOrder({
      aditionalInfo: req.body,
      productId: req.query.productId as any,
      userId: token.userId,
      status: "pending",
    });
    res.send({ url: order.url, orderId: order.orderId });
  },
});

export default authMiddleware(handler);
