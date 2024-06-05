import { FindCardById } from "../../../domain/usecases/find-card-by-id";
import { Card } from "../../../infra/db/typeorm/db/entities/card-entity";
import { CardRepository } from "../../protocols/db/card-repository";

export class DbFindCardByIdTournaments implements FindCardById {
  constructor(private readonly tournamentRepository: CardRepository) {}

  async findById(id: number): Promise<Card> {
    return this.tournamentRepository.findById(id);
  }
}
