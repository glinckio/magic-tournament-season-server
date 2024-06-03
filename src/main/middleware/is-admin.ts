import { NextFunction, Request, Response } from "express";
import { Roles } from "../../domain/models/roles";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.player.role === Roles.PLAYER) {
    return res.status(403).json({ message: "Not authorized" });
  }
  next();
};

export default isAdmin;
