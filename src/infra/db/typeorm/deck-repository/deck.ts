import { DeckRepository } from "../../../../data/protocols/db/deck-repository";
import { UpdateDeckModel } from "../../../../domain/usecases/update-deck";
import AppDataSource from "../db/data-source";
import { Deck } from "../db/entities/deck-entity";

export class DeckTypeOrmRepository implements DeckRepository {
  async update(deck: UpdateDeckModel): Promise<Deck> {
    const { id, title, player } = deck;
    const deckRepository = AppDataSource.getRepository(Deck);
    const data = await deckRepository.save({
      id,
      title,
      player,
    });

    return data;
  }
}
