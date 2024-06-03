import { Deck } from "../../../infra/db/typeorm/db/entities/deck.entity";

export interface AddDeckRepository {
  add(deck: any): Promise<Deck>;
}
