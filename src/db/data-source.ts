import { DataSource } from "typeorm";
import { Player } from "../entities/player.entity";
import { Deck } from "../entities/deck.entity";
import { Card } from "../entities/card.entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "magic-tournament-season",
  synchronize: false,
  logging: false,
  entities: [Player, Deck, Card],
  migrations: ["migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;
