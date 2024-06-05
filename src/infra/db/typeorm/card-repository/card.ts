import AppDataSource from "../db/data-source";
import { CardRepository } from "../../../../data/protocols/db/card-repository";
import { Card } from "../db/entities/card-entity";
import { AddCardModel } from "../../../../domain/usecases/add-card";

export class CardTypeOrmRepository implements CardRepository {
  async findById(id: number): Promise<Card> {
    const cardRepository = AppDataSource.getRepository(Card);
    const data = await cardRepository.findOneBy({ id });

    return data;
  }

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

  async remove(id: number): Promise<null> {
    const cardRepository = AppDataSource.getRepository(Card);
    await cardRepository.delete({ id });

    return null;
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
