import { DbAddCard } from "../../../data/usecases/add-card/db-add-card";
import { AddCardTypeOrmRepository } from "../../../infra/db/typeorm/card-repository/deck";
import { AddCardController } from "../../../presentation/controllers/add-card/add-card";
import { Controller } from "../../../presentation/protocols/controller";
import { makeAddCardValidation } from "./add-card-validation";

export const makeAddCardController = (): Controller => {
  const addCardTypeOrmRepository = new AddCardTypeOrmRepository();
  const addCard = new DbAddCard(addCardTypeOrmRepository);
  return new AddCardController(addCard, makeAddCardValidation());
};
