import { DbUpdateDeck } from "../../../data/usecases/update-deck/db-upddate-deck";
import { DeckTypeOrmRepository } from "../../../infra/db/typeorm/deck-repository/deck";
import { UpdateDeckController } from "../../../presentation/controllers/update-deck/update-deck";
import { Controller } from "../../../presentation/protocols/controller";
import { makeUpdateDeckValidation } from "./update-deck-validation";

export const makeUpdateDeckController = (): Controller => {
  const deckTypeOrmRepository = new DeckTypeOrmRepository();
  const updateDeck = new DbUpdateDeck(deckTypeOrmRepository);
  return new UpdateDeckController(updateDeck, makeUpdateDeckValidation());
};
