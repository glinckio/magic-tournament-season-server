import { RemoveCard } from "../../../domain/usecases/remove-card";
import { CardRepository } from "../../protocols/db/card-repository";

export class DbRemoveCard implements RemoveCard {
  constructor(private readonly cardRepository: CardRepository) {}

  async remove(id: number): Promise<null> {
    return this.cardRepository.remove(id);
  }
}
