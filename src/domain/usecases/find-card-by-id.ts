import { Card } from "../../infra/db/typeorm/db/entities/card-entity";

export interface FindCardById {
  findById(id: number): Promise<Card>;
}
