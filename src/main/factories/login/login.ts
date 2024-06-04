import env from "../../../config/env";
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "../../../infra/criptography/jwt-adapter/jwt-adapter";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { LoginController } from "../../../presentation/controllers/login/login";
import { Controller } from "../../../presentation/protocols/controller";
import { makeLoginValidation } from "./login-validation";

export const makeLoginController = (): Controller => {
  const salt = 12;
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const encyprt = new JwtAdapter(env.JWT_SECRET);
  const authentication = new DbAuthentication(
    playerTypeOrmRepository,
    bcryptAdapter,
    encyprt
  );
  return new LoginController(authentication, makeLoginValidation());
};
