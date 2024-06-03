import { DbAddCard } from "../../../data/usecases/add-card/db-add-card";
import { CardTypeOrmRepository } from "../../../infra/db/typeorm/card-repository/card";
import { AddCardController } from "../../../presentation/controllers/add-card/add-card";
import { Controller } from "../../../presentation/protocols/controller";
import { CardValidatorDecorator } from "../../decorators/duplicated-card";
import { makeAddCardValidation } from "./add-card-validation";

export const makeAddCardController = (): Controller => {
  const cardTypeOrmRepository = new CardTypeOrmRepository();
  const addCard = new DbAddCard(cardTypeOrmRepository);
  const controller = new AddCardController(addCard, makeAddCardValidation());
  return new CardValidatorDecorator(controller, cardTypeOrmRepository);
};
