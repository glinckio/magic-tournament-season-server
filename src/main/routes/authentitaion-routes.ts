import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSignUpController } from "../factories/signup/signup";
import { makeLoginController } from "../factories/login/login";

const router = Router();

router.post("/signup", adaptRoute(makeSignUpController()));
router.post("/login", adaptRoute(makeLoginController()));

export default router;
