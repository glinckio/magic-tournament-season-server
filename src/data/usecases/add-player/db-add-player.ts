import { AddPlayer, AddPlayerModel } from "../../../domain/usecases/add-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player.entity";
import { Hasher } from "../../protocols/criptography/hasher";
import { AddPlayerRepository } from "../../protocols/db/add-player-repository";

export class DbAddPlayer implements AddPlayer {
  constructor(
    private readonly hasher: Hasher,
    private readonly addPlayerRepository: AddPlayerRepository
  ) {}

  async add(playerData: AddPlayerModel): Promise<Player> {
    const hashedPassword = await this.hasher.hash(playerData.password);
    return this.addPlayerRepository.add({
      ...playerData,
      password: hashedPassword,
    });
  }
}
