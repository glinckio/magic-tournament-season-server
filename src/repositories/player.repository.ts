import AppDataSource from "../db/data-source";
import { Player } from "../entities/player.entity";

export interface IAddPlayer {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export class PlayerRepository {
  async signup(player: IAddPlayer): Promise<Player[]> {
    const playerRepository = AppDataSource.getRepository(Player);
    return playerRepository.find();
  }
}
