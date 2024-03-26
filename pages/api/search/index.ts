import type { NextApiRequest, NextApiResponse } from "next";

import { getOfferAndLimit } from "lib/requestes";
import { searchProducts } from "lib/controllers/product";

import * as methods from "micro-method-router";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { offset, limit } = getOfferAndLimit(req);
      const { q } = req.query;
      const results = await searchProducts(q as string, limit, offset);

      res.send({
        results: results.hits,
        pagination: {
          offset,
          limit,
          total: results.nbHits,
        },
      });
    } catch (error) {
      res.status(401).send(error);
    }
  },
});
