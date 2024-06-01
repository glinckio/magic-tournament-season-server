import "reflect-metadata";
import express from "express";
import { Router } from "express";
import AppDataSource from "./db/data-source";
import { makeSignUpController } from "./factories/authentication.factory";
import { adaptRoute } from "./adapters/express-route-adapter";

const app = express();
const route = Router();

route.get("/signup", adaptRoute(makeSignUpController()));

app.use(express.json());
app.use(route);

AppDataSource.initialize().then(async () => {
  app.listen(3333, () => "server running on port 3333");
});
