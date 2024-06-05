import { DbRemoveTournament } from "../../../data/usecases/remove-tournament/db-remove-tournament";
import { TournamentTypeOrmRepository } from "../../../infra/db/typeorm/tournament-repository/tournament";
import { RemoveTournamentController } from "../../../presentation/controllers/remove-tournament/remove-tournament";
import { Controller } from "../../../presentation/protocols/controller";
import { NotExistingTournamentValidator } from "../../decorators/not-existing-tournament";

export const makeRemoveTournamentController = (): Controller => {
  const tournamentTypeOrmRepository = new TournamentTypeOrmRepository();
  const remove = new DbRemoveTournament(tournamentTypeOrmRepository);
  const controller = new RemoveTournamentController(remove);
  return new NotExistingTournamentValidator(
    controller,
    tournamentTypeOrmRepository
  );
};
