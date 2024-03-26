import { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "lib/auth";
import { generate } from "lib/jwt";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);
  if (!auth) {
    res.status(401).send({
      message: "email o code incorrect",
    });
  }

  const expires = auth.isCodeExpired();
  if (expires) {
    res.status(401).send({
      message: "token expirado",
    });
  }
  var token = generate({ userId: auth.data.userId });
  res.send({ token });
}
