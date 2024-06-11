import { DbFindAllTournaments } from "../../../data/usecases/find-all-tournaments/db-find-all-tournaments";
import { TournamentTypeOrmRepository } from "../../../infra/db/typeorm/tournament-repository/tournament";
import { FindAllTournamentsController } from "../../../presentation/controllers/find-all-tornaments/find-all-tournaments";
import { Controller } from "../../../presentation/protocols/controller";

export const makeFindAllTournamentsController = (): Controller => {
  const tournamentTypeOrmRepository = new TournamentTypeOrmRepository();
  const findAllTournaments = new DbFindAllTournaments(
    tournamentTypeOrmRepository
  );
  return new FindAllTournamentsController(findAllTournaments);
};
