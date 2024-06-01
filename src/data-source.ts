import { DataSource } from "typeorm";
import { Player } from "./entities/Player.entity";
import { Deck } from "./entities/Deck.entity";
import { Card } from "./entities/Card.entity";

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
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;
