import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import NextCors from "nextjs-cors";

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res.status(401).send({ message: "NO hay TOKEN" });
    }
    const decodedToken = decode(token);

    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "TOKEN INCORRECTO" });
    }
  };
}
function allowCors(fn) {
  return async (...params) => {
    const [req, res] = params;

    return new Promise((resolve, reject) => {
      cors()(req, res, () => {
        const result = fn(...params);
        resolve(result);
      });
    });
  };
}
export function byMethod(methodsHandler) {
  const methods = require("micro-method-router");
  return allowCors(methods(methodsHandler));
}
export function handlerCors(callback) {
  try {
    return async function (req: NextApiRequest, res: NextApiResponse) {
      // Run the cors middleware
      // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
      await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      });

      // Rest of the API logic

      callback(req, res);
      //res.json({ message: "Hello NextJs Cors!" });
    };
  } catch (e) {
    console.log(e);
  }
}
