import { AddCard, AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card.entity";
import { AddCardRepository } from "../../protocols/db/add-card-repository";

export class DbAddCard implements AddCard {
  constructor(private readonly addCardRepository: AddCardRepository) {}

  async add(cardData: AddCardModel): Promise<Card> {
    return this.addCardRepository.add(cardData);
  }
}
