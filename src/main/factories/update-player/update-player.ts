import { DbUpdatePlayer } from "../../../data/usecases/update-player/update-player";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { UpdatePlayerController } from "../../../presentation/controllers/update-player/update-player";
import { Controller } from "../../../presentation/protocols/controller";
import { makeUpdatePlayerValidation } from "./update-player-validation";

export const makeUpdatePlayerController = (): Controller => {
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const updatePlayer = new DbUpdatePlayer(playerTypeOrmRepository);
  return new UpdatePlayerController(updatePlayer, makeUpdatePlayerValidation());
};
