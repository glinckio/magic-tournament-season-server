import { Deck } from "../../infra/db/typeorm/db/entities/deck-entity";
import { Player } from "../../infra/db/typeorm/db/entities/player-entity";

export interface UpdateDeckModel {
  id: number;
  title: string;
  player: Player;
}

export interface UpdateDeck {
  update(deck: UpdateDeckModel): Promise<Deck>;
}
