import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { UpdatePlayerModel } from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player.entity";

export interface PlayerRepository {
  add(player: AddPlayerModel): Promise<Player>;
  update(player: UpdatePlayerModel): Promise<Player>;
  findByCpf(cpf: string): Promise<Player>;
  findByEmail(email: string): Promise<Player>;
}
