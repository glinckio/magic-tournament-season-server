import AppDataSource from "../db/data-source";
import { AddCardRepository } from "../../../../data/protocols/db/add-card-repository";
import { Card } from "../db/entities/card.entity";
import { AddCardModel } from "../../../../domain/usecases/add-card";

export class AddCardTypeOrmRepository implements AddCardRepository {
  async add(card: AddCardModel): Promise<Card> {
    const { cardId, name, image, colors, deck } = card;
    const cardRepository = AppDataSource.getRepository(Card);
    const data = await cardRepository.save({
      cardId,
      name,
      image,
      colors,
      deck,
    });

    return data;
  }
}
