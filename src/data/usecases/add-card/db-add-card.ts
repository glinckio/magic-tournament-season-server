import { AddCard, AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card-entity";
import { CardRepository } from "../../protocols/db/card-repository";

export class DbAddCard implements AddCard {
  constructor(private readonly cardRepository: CardRepository) {}

  async add(cardData: AddCardModel): Promise<Card> {
    return this.cardRepository.add(cardData);
  }
}
