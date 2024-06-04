import { Card } from "../../infra/db/typeorm/db/entities/card-entity";
import { Deck } from "../../infra/db/typeorm/db/entities/deck-entity";

export interface AddCardModel {
  cardId: string;
  name: string;
  image: string;
  colors: string;
  deck: Deck;
}

export interface AddCard {
  add(card: AddCardModel): Promise<Card>;
}
