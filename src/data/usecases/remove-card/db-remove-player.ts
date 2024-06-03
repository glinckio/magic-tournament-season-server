import { RemoveCard } from "../../../domain/usecases/remove-card";
import { RemoveCardRepository } from "../../protocols/db/remove-card-repository";

export class DbRemoveCard implements RemoveCard {
  constructor(private readonly removeCardRepository: RemoveCardRepository) {}

  async remove(id: number): Promise<null> {
    return this.removeCardRepository.remove(id);
  }
}
