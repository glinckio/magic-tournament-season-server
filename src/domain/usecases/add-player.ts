import { Player } from "../../infra/db/typeorm/db/entities/player-entity";

export interface AddPlayerModel {
  name: string;
  cpf: string;
  email: string;
  password: string;
  role?: string;
}

export interface AddPlayer {
  add(player: AddPlayerModel): Promise<Player>;
}
