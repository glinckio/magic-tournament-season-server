import { AddDeckRepository } from "../../../../data/protocols/db/add-deck-repository";
import AppDataSource from "../db/data-source";
import { Deck } from "../db/entities/deck.entity";

export class PlayerTypeOrmRepository implements AddDeckRepository {
  async add(deck: any): Promise<Deck> {
    return;
  }
}
