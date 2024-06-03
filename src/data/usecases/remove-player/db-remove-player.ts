import { RemovePlayer } from "../../../domain/usecases/remove-player";
import { PlayerRepository } from "../../protocols/db/player-repository";

export class DbRemovePlayer implements RemovePlayer {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async remove(id: number): Promise<null> {
    return this.playerRepository.remove(id);
  }
}
