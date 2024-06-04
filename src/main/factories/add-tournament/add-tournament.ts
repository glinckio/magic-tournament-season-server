import { TournamentTypeOrmRepository } from "../../../infra/db/typeorm/tournament-repository/tournament";
import { AddTournamentController } from "../../../presentation/controllers/add-tournament/add-tournament";
import { Controller } from "../../../presentation/protocols/controller";
import { TournamentValidatorDecorator } from "../../decorators/duplicated-tournament";
import { makeAddTournamentValidation } from "./add-tournament-validation";

export const makeAddTournamentController = (): Controller => {
  const tournamentTypeOrmRepository = new TournamentTypeOrmRepository();
  const controller = new AddTournamentController(
    tournamentTypeOrmRepository,
    makeAddTournamentValidation()
  );
  return new TournamentValidatorDecorator(
    controller,
    tournamentTypeOrmRepository
  );
};
