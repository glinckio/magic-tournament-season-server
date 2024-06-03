import express from "express";

declare global {
  namespace Express {
    interface Request {
      player?: Record<string, any>;
    }
  }
}
