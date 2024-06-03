import {
  UpdateDeck,
  UpdateDeckModel,
} from "../../../domain/usecases/update-deck";
import { Deck } from "../../../infra/db/typeorm/db/entities/deck.entity";
import { DeckRepository } from "../../protocols/db/deck-repository";

export class DbUpdateDeck implements UpdateDeck {
  constructor(private readonly playerRepository: DeckRepository) {}

  async update(deckData: UpdateDeckModel): Promise<Deck> {
    return this.playerRepository.update(deckData);
  }
}
