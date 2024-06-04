import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import checkTokenOnRequest from "../middleware/check-jwt-token";
import { makeAddCardController } from "../factories/add-card/add-card";
import { makeRemoveCardController } from "../factories/remove-card/remove-card";

const router = Router();

router.post("/card", checkTokenOnRequest, adaptRoute(makeAddCardController()));
router.delete(
  "/card/:id",
  checkTokenOnRequest,
  adaptRoute(makeRemoveCardController())
);

export default router;
