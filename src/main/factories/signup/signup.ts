import { DbAddPlayer } from "../../../data/usecases/add-player/db-add-player";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { SignUpController } from "../../../presentation/controllers/signup/signup";
import { Controller } from "../../../presentation/protocols/controller";
import { PlayerValidatorDecorator } from "../../decorators/duplicated-user";
import { makeSignUpValidation } from "./signup-validation";

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const addPlayer = new DbAddPlayer(bcryptAdapter, playerTypeOrmRepository);
  const controller = new SignUpController(addPlayer, makeSignUpValidation());
  return new PlayerValidatorDecorator(controller, playerTypeOrmRepository);
};
