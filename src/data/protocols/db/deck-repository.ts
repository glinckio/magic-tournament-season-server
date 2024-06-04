import { UpdateDeckModel } from "../../../domain/usecases/update-deck";
import { Deck } from "../../../infra/db/typeorm/db/entities/deck-entity";

export interface DeckRepository {
  update(deck: UpdateDeckModel): Promise<Deck>;
}
