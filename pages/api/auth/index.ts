//todo OK

import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "lib/controllers/auth";
import { handlerCors } from "lib/middlewares";
import methods from "micro-method-router";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await sendCode(req.body.email);
  res.status(200).json({ message: "ok" });
}
const handlerAuth = methods({
  post: handler,
});

export default handlerCors(handlerAuth);
