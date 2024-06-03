import { AddPlayer, AddPlayerModel } from "../../../domain/usecases/add-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player.entity";
import { Hasher } from "../../protocols/criptography/hasher";
import { PlayerRepository } from "../../protocols/db/player-repository";

export class DbAddPlayer implements AddPlayer {
  constructor(
    private readonly hasher: Hasher,
    private readonly playerRepository: PlayerRepository
  ) {}

  async add(playerData: AddPlayerModel): Promise<Player> {
    const hashedPassword = await this.hasher.hash(playerData.password);
    return this.playerRepository.add({
      ...playerData,
      password: hashedPassword,
    });
  }
}
