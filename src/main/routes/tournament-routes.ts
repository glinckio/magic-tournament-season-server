import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import isAdmin from "../middleware/is-admin";
import { makeAddTournamentController } from "../factories/add-tournament/add-tournament";
import { makeFindAllTournamentsController } from "../factories/find-all-tournaments/make-all-tournaments";
import { makeRemoveTournamentController } from "../factories/remove-tournament/remove-tournament";

const router = Router();

router.post(
  "/tournament",
  checkTokenOnRequest,
  isAdmin,
  adaptRoute(makeAddTournamentController())
);
router.get(
  "/tournament",
  checkTokenOnRequest,
  adaptRoute(makeFindAllTournamentsController())
);
router.put(
  "/tournament",
  checkTokenOnRequest,
  adaptRoute(makeFindAllTournamentsController())
);
router.delete(
  "/tournament/:id",
  checkTokenOnRequest,
  adaptRoute(makeRemoveTournamentController())
);

export default router;
