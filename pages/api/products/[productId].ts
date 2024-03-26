import type { NextApiRequest, NextApiResponse } from "next";
import * as methods from "micro-method-router";
import { getProductById } from "lib/controllers/product";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { productId } = req.query;
      const results = await getProductById(productId);
      res.status(200).json({
        result: results,
      });
    } catch (error) {
      res.status(404).send(error);
    }
  },
});
