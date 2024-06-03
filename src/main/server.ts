import "reflect-metadata";
import express from "express";
import { Router } from "express";
import AppDataSource from "../infra/db/typeorm/db/data-source";
import { makeSignUpController } from "./factories/signup/signup";
import { makeLoginController } from "./factories/login/login";
import { adaptRoute } from "./adapters/express-route-adapter";
import { makeAddCardController } from "./factories/add-card/add-card";
import checkTokenOnRequest from "./middleware/check-jwt-token";
import { makeRemoveCardController } from "./factories/remove-card/remove-card";

const app = express();
const route = Router();

route.post("/signup", adaptRoute(makeSignUpController()));
route.post("/login", adaptRoute(makeLoginController()));
route.post("/card", checkTokenOnRequest, adaptRoute(makeAddCardController()));
route.delete(
  "/card/:id",
  checkTokenOnRequest,
  adaptRoute(makeRemoveCardController())
);

app.use(express.json());
app.use(route);

AppDataSource.initialize().then(async () => {
  app.listen(3333, () => "server running on port 3333");
});
