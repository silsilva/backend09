//todo OK

import { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "lib/controllers/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await sendCode(req.body.email);
  res.status(200).json({ message: "ok" });
}
