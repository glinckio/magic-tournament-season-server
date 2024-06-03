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

  async isCardExistInDeck(card: AddCardModel): Promise<boolean> {
    const { cardId, deck } = card;
    const cardRepository = AppDataSource.getRepository(Card);
    const isCardExists = await cardRepository.findOne({
      where: { cardId, deck: { id: deck.id } },
    });

    if (!isCardExists) {
      return false;
    }

    return true;
  }
}
