import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import isAdmin from "../middleware/is-admin";
import { makeAddTournamentController } from "../factories/add-tournament/add-tournament";

const router = Router();

router.post(
  "/tournament",
  checkTokenOnRequest,
  isAdmin,
  adaptRoute(makeAddTournamentController())
);

export default router;
