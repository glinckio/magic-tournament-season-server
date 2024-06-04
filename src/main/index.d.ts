/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { Player } from "../infra/db/typeorm/db/entities/player.entity";

declare global {
  namespace Express {
    interface Request {
      player?: Player;
    }
  }
}
