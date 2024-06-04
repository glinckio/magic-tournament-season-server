import "reflect-metadata";
import express from "express";
import AppDataSource from "../infra/db/typeorm/db/data-source";
import authenticationRoutes from "./routes/authentitaion-routes";
import cardRoutes from "./routes/authentitaion-routes";
import playerRoutes from "./routes/player-routes";
import deckRoutes from "./routes/deck-routes";

const app = express();
app.use(express.json());
app.use("/api/v1", authenticationRoutes);
app.use("/api/v1", cardRoutes);
app.use("/api/v1", playerRoutes);
app.use("/api/v1", deckRoutes);

AppDataSource.initialize().then(async () => {
  app.listen(3333, () => "server running on port 3333");
});
