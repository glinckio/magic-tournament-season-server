import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import { makeFindAllPlayersController } from "../factories/find-all-players/find-all-players";
import { makeUpdatePlayerController } from "../factories/update-player/update-player";
import { makeDeletePlayerController } from "../factories/remove-player/remove-player";
import isAdmin from "../middleware/is-admin";

const router = Router();

router.get(
  "/player",
  checkTokenOnRequest,
  isAdmin,
  adaptRoute(makeFindAllPlayersController())
);
router.put(
  "/player",
  checkTokenOnRequest,
  adaptRoute(makeUpdatePlayerController())
);
router.delete(
  "/player/:id",
  checkTokenOnRequest,
  isAdmin,
  adaptRoute(makeDeletePlayerController())
);

export default router;
