import { FindAllPlayers } from "../../../domain/usecases/find-all-players";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { PlayerRepository } from "../../protocols/db/player-repository";

export class DbFindAllPlayers implements FindAllPlayers {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }
}
