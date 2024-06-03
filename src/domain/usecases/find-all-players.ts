import { Player } from "../../infra/db/typeorm/db/entities/player.entity";

export interface FindAllPlayers {
  findAll(): Promise<Player[]>;
}
