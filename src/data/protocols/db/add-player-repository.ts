import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player.entity";

export interface AddPlayerRepository {
  add(player: AddPlayerModel): Promise<Player>;
  findByCpf(cpf: string): Promise<Player>;
  findByEmail(email: string): Promise<Player>;
}
