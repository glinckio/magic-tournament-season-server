import "reflect-metadata";
import express from "express";
import { Router } from "express";
import AppDataSource from "../infra/db/typeorm/db/data-source";
import { makeSignUpController } from "./factories/signup/signup";
import { makeLoginController } from "./factories/login/login";
import { adaptRoute } from "./adapters/express-route-adapter";

const app = express();
const route = Router();

route.post("/signup", adaptRoute(makeSignUpController()));
route.post("/login", adaptRoute(makeLoginController()));

app.use(express.json());
app.use(route);

AppDataSource.initialize().then(async () => {
  app.listen(3333, () => "server running on port 3333");
});
