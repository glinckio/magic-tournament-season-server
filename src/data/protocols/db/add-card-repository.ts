import { AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card.entity";

export interface AddCardRepository {
  add(card: AddCardModel): Promise<Card>;
}
