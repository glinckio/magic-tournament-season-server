import { PlayerRepository } from "../../../../data/protocols/db/player-repository";
import AppDataSource from "../db/data-source";
import { AddPlayerModel } from "../../../../domain/usecases/add-player";
import { Player } from "../db/entities/player.entity";
import { Deck } from "../db/entities/deck.entity";
import { UpdatePlayerModel } from "../../../../domain/usecases/update-player";

export class PlayerTypeOrmRepository implements PlayerRepository {
  async add(player: AddPlayerModel): Promise<Player> {
    const { cpf, email, name, password } = player;
    const playerRepository = AppDataSource.getRepository(Player);
    const deckRepository = AppDataSource.getRepository(Deck);
    const { id: deckId } = await deckRepository.save({});
    const data = await playerRepository.save({
      cpf,
      email,
      name,
      password,
      deck: {
        id: deckId,
      },
    });

    await deckRepository.save({
      id: deckId,
      player: {
        id: data.id,
      },
    });

    return data;
  }

  async update(player: UpdatePlayerModel): Promise<Player> {
    const { id, cpf, email, name } = player;
    const playerRepository = AppDataSource.getRepository(Player);
    const data = await playerRepository.save({
      id,
      cpf,
      email,
      name,
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
