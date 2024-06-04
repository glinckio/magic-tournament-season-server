import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import { makeUpdateDeckController } from "../factories/update-deck/update-deck";

const router = Router();

router.put(
  "/deck",
  checkTokenOnRequest,
  adaptRoute(makeUpdateDeckController())
);

export default router;
