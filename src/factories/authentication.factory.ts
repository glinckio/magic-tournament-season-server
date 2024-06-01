import { SignUpController } from "../controllers/player.controller";
import { PlayerRepository } from "../repositories/player.repository";

export const makeSignUpController = () => {
  const playerRepository = new PlayerRepository();

  return new SignUpController(playerRepository);
};
