import { DbRemoveTournamentPlayer } from "../../../data/usecases/remove-tournament-player/db-remove-tournament-player";
import { TournamentPlayerTypeOrmRepository } from "../../../infra/db/typeorm/tournament-player-repository/tournament-player";
import { RemoveTournamentPlayerController } from "../../../presentation/controllers/remove-tournament-player/remove-tournament-player";
import { Controller } from "../../../presentation/protocols/controller";

export const makeRemoveTournamentPlayersController = (): Controller => {
  const tournamentPlayerTypeOrmRepository =
    new TournamentPlayerTypeOrmRepository();
  const removePlayer = new DbRemoveTournamentPlayer(
    tournamentPlayerTypeOrmRepository
  );
  return new RemoveTournamentPlayerController(removePlayer);
};
