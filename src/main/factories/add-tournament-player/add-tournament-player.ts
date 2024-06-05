import { TournamentPlayerTypeOrmRepository } from "../../../infra/db/typeorm/tournament-player-repository/tournament-player";
import { AddTournamentPlayerController } from "../../../presentation/controllers/add-tournament-player/add-tournament-player";
import { Controller } from "../../../presentation/protocols/controller";

export const makeAddTournamentPlayerController = (): Controller => {
  const tournamentPlayerTypeOrmRepository =
    new TournamentPlayerTypeOrmRepository();
  return new AddTournamentPlayerController(tournamentPlayerTypeOrmRepository);
};
