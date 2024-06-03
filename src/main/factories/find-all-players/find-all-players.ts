import { DbFindAllPlayers } from "../../../data/usecases/find-all-players/find-all-players";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { FindAllPlayersController } from "../../../presentation/controllers/find-all-players/find-all-players";
import { Controller } from "../../../presentation/protocols/controller";

export const makeFindAllPlayersController = (): Controller => {
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const findAllPlayers = new DbFindAllPlayers(playerTypeOrmRepository);
  return new FindAllPlayersController(findAllPlayers);
};
