import { PlayerRepository } from "../../../../data/protocols/db/player-repository";
import AppDataSource from "../db/data-source";
import { AddPlayerModel } from "../../../../domain/usecases/add-player";
import { Player } from "../db/entities/player-entity";
import { Deck } from "../db/entities/deck-entity";
import { UpdatePlayerModel } from "../../../../domain/usecases/update-player";
import { Card } from "../db/entities/card-entity";
import { Roles } from "../../../../domain/models/roles";
import { TournamentPlayer } from "../db/entities/tournament-player-entity";

export class PlayerTypeOrmRepository implements PlayerRepository {
  async findAll(): Promise<Player[]> {
    const playerRepository = AppDataSource.getRepository(Player);
    const data = await playerRepository.find();
    return data;
  }

  async add(player: AddPlayerModel): Promise<Player> {
    const { cpf, email, name, password, role = Roles.PLAYER } = player;
    const playerRepository = AppDataSource.getRepository(Player);
    const deckRepository = AppDataSource.getRepository(Deck);
    const { id: deckId } = await deckRepository.save({});
    const data = await playerRepository.save({
      cpf,
      email,
      name,
      role,
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
    const { id, cpf, email, name, role } = player;
    const playerRepository = AppDataSource.getRepository(Player);
    const data = await playerRepository.save({
      id,
      cpf,
      email,
      name,
      role,
    });

    return data;
  }

  async remove(id: number): Promise<null> {
    const playerRepository = AppDataSource.getRepository(Player);
    const cardRepository = AppDataSource.getRepository(Card);
    const deckRepository = AppDataSource.getRepository(Deck);
    const tournamentPlayerRepository =
      AppDataSource.getRepository(TournamentPlayer);

    console.log(id);

    const player = await playerRepository.findOneBy({ id });
    const cards = await cardRepository.findBy({ deck: { id: player.deck.id } });
    for (let i = 0; i < cards.length; i++) {
      await cardRepository.delete({ id: cards[i].id });
    }
    const tournaments = await tournamentPlayerRepository.find({
      where: { player: { id } },
    });

    for (let i = 0; i < tournaments.length; i++) {
      await tournamentPlayerRepository.delete({ id: tournaments[i].id });
    }
    await playerRepository.delete({ id: player.id });
    await deckRepository.delete({ id: player.deck.id });

    return null;
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
