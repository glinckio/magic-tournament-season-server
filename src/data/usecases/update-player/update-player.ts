import {
  UpdatePlayer,
  UpdatePlayerModel,
} from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { PlayerRepository } from "../../protocols/db/player-repository";

export class DbUpdatePlayer implements UpdatePlayer {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async update(playerData: UpdatePlayerModel): Promise<Player> {
    return this.playerRepository.update(playerData);
  }
}
