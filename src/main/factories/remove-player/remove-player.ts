import { DbRemovePlayer } from "../../../data/usecases/remove-player/db-remove-player";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { RemovePlayerController } from "../../../presentation/controllers/remove-player/remove-player";
import { Controller } from "../../../presentation/protocols/controller";

export const makeDeletePlayerController = (): Controller => {
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const removePlayer = new DbRemovePlayer(playerTypeOrmRepository);
  return new RemovePlayerController(removePlayer);
};
