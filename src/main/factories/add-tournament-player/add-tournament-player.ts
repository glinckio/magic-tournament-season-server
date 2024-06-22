import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { TournamentPlayerTypeOrmRepository } from "../../../infra/db/typeorm/tournament-player-repository/tournament-player";
import { TournamentTypeOrmRepository } from "../../../infra/db/typeorm/tournament-repository/tournament";
import { AddTournamentPlayerController } from "../../../presentation/controllers/add-tournament-player/add-tournament-player";
import { Controller } from "../../../presentation/protocols/controller";
import { NotExistingPlayerTournamentValidator } from "../../decorators/not-existing-player-tournament";

export const makeAddTournamentPlayerController = (): Controller => {
  const tournamentPlayerTypeOrmRepository =
    new TournamentPlayerTypeOrmRepository();
  const playerTypeOrmRepository = new PlayerTypeOrmRepository();
  const tournamenTypeOrmRepository = new TournamentTypeOrmRepository();
  const controller = new AddTournamentPlayerController(
    tournamentPlayerTypeOrmRepository
  );
  return new NotExistingPlayerTournamentValidator(
    controller,
    playerTypeOrmRepository,
    tournamenTypeOrmRepository
  );
};
