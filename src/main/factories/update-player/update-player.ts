import { DbUpdatePlayer } from "../../../data/usecases/update-player/db-update-player";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { UpdatePlayerController } from "../../../presentation/controllers/update-player/update-player";
import { Controller } from "../../../presentation/protocols/controller";
import { NotExistingPlayerValidator } from "../../decorators/not-existing-player";
import { makeUpdatePlayerValidation } from "./update-player-validation";

export const makeUpdatePlayerController = (): Controller => {
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const updatePlayer = new DbUpdatePlayer(playerTypeOrmRepository);
  const controller = new UpdatePlayerController(
    updatePlayer,
    makeUpdatePlayerValidation()
  );
  return new NotExistingPlayerValidator(controller, playerTypeOrmRepository);
};
