import { NextFunction, Response, Request } from "express";
import { JwtAdapter } from "../../infra/criptography/jwt-adapter/jwt-adapter";
import env from "../../config/env";

const checkTokenOnRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const jwt = new JwtAdapter(env.JWT_SECRET);
  const { error, decoded } = await jwt.verify(token.split(" ")[1]);

  if (error) {
    return res.status(403).json({ message: "Malformated Token" });
  }

  req.player = decoded;
  next();
};

export default checkTokenOnRequest;
