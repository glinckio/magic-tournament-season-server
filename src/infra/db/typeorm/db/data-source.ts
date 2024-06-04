import { DataSource } from "typeorm";
import { Player } from "./entities/player-entity";
import { Deck } from "./entities/deck-entity";
import { Card } from "./entities/card-entity";
import { Tournament } from "./entities/tournament-entity";
import env from "../../../../config/env";

const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Player, Deck, Card, Tournament],
  migrations: [__dirname + "/migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;
