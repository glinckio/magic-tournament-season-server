import { Player } from "../../infra/db/typeorm/db/entities/player.entity";

export interface UpdatePlayerModel {
  id: number;
  name: string;
  cpf: string;
  email: string;
  role: string;
}

export interface UpdatePlayer {
  update(player: UpdatePlayerModel): Promise<Player>;
}
