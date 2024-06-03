import { AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card.entity";

export interface CardRepository {
  add(card: AddCardModel): Promise<Card>;
  remove(id: number): Promise<null>;
}
