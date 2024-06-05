import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import { makeAddTournamentPlayerController } from "../factories/add-tournament-player/add-tournament-player";
import isAdmin from "../middleware/is-admin";
import { makeFindAllTournamentPlayersController } from "../factories/find-all-tournament-players/find-all-tournament-players";
import { makeRemoveTournamentPlayersController } from "../factories/remove-tournament-player/remove-tournament-player";

const router = Router();

router.patch(
  "/tournament/register",
  checkTokenOnRequest,
  adaptRoute(makeAddTournamentPlayerController())
);
router.get(
  "/tournament/player",
  checkTokenOnRequest,
  isAdmin,
  adaptRoute(makeFindAllTournamentPlayersController())
);
router.delete(
  "/tournament/player/:id",
  checkTokenOnRequest,
  isAdmin,
  adaptRoute(makeRemoveTournamentPlayersController())
);
export default router;
