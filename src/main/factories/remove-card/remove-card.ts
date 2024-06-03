import { DbRemoveCard } from "../../../data/usecases/remove-card/db-remove-player";
import { CardTypeOrmRepository } from "../../../infra/db/typeorm/card-repository/card";
import { RemoveCardController } from "../../../presentation/controllers/remove-card/remove-card";
import { Controller } from "../../../presentation/protocols/controller";

export const makeRemoveCardController = (): Controller => {
  const cardTypeOrmRepository = new CardTypeOrmRepository();
  const removeCard = new DbRemoveCard(cardTypeOrmRepository);
  return new RemoveCardController(removeCard);
};
