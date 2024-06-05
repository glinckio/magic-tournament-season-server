import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import { makeAddTournamentPlayerController } from "../factories/add-tournament-player/add-tournament-player";

const router = Router();

router.patch(
  "/tournament/register",
  checkTokenOnRequest,
  adaptRoute(makeAddTournamentPlayerController())
);
export default router;
