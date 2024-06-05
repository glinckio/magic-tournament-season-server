import { TournamentPlayerTypeOrmRepository } from "../../../infra/db/typeorm/tournament-player/tournament-player";
import { FindAllTournamentPlayersController } from "../../../presentation/controllers/find-all-tournament-players/find-all-tournament-players";
import { Controller } from "../../../presentation/protocols/controller";

export const makeFindAllTournamentPlayersController = (): Controller => {
  const tournamentPlayerTypeOrmRepository =
    new TournamentPlayerTypeOrmRepository();
  return new FindAllTournamentPlayersController(
    tournamentPlayerTypeOrmRepository
  );
};
