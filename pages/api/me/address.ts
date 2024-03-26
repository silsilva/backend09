import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { User } from "lib/user";
import * as methods from "micro-method-router";

async function patchAdress(req: NextApiRequest, res: NextApiResponse, token) {
  const user = new User(token.userId);
  user.setData(req.body);
  await user.push();
  res.status(200).json({
    message: "Usuario modificado correctamente.",
  });
}
const handler = methods({
  patch: patchAdress,
});
export default authMiddleware(handler);
