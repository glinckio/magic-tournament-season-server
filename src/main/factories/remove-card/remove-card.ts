import { DbRemoveCard } from "../../../data/usecases/remove-card/db-remove-player";
import { CardTypeOrmRepository } from "../../../infra/db/typeorm/card-repository/card";
import { RemoveCardController } from "../../../presentation/controllers/remove-card/remove-card";
import { Controller } from "../../../presentation/protocols/controller";
import { NotExistingCardValidator } from "../../decorators/not-existing-card";

export const makeRemoveCardController = (): Controller => {
  const cardTypeOrmRepository = new CardTypeOrmRepository();
  const removeCard = new DbRemoveCard(cardTypeOrmRepository);
  const controller = new RemoveCardController(removeCard);
  return new NotExistingCardValidator(controller, cardTypeOrmRepository);
};
