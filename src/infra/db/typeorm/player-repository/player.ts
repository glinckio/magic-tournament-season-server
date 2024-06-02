import { AddPlayerRepository } from "../../../../data/protocols/db/add-player-repository";
import AppDataSource from "../db/data-source";
import { AddPlayerModel } from "../../../../domain/usecases/add-player";
import { Player } from "../db/entities/player.entity";

export class PlayerTypeOrmRepository implements AddPlayerRepository {
  async add(player: AddPlayerModel): Promise<Player> {
    const { cpf, email, name, password } = player;
    const playerRepository = AppDataSource.getRepository(Player);
    const data = await playerRepository.save({
      cpf,
      email,
      name,
      password,
    });

    return data;
  }

  async findByCpf(cpf: string): Promise<Player> {
    const playerRepository = AppDataSource.getRepository(Player);
    const data = await playerRepository.findOneBy({ cpf });
    return data;
  }

  async findByEmail(email: string): Promise<Player> {
    const playerRepository = AppDataSource.getRepository(Player);
    const data = await playerRepository.findOneBy({ email });
    return data;
  }
}
