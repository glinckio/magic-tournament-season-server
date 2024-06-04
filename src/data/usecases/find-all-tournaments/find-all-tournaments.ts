import { FindAllTournaments } from "../../../domain/usecases/find-all-tournaments";
import { Tournament } from "../../../infra/db/typeorm/db/entities/tournament-entity";
import { TournamentRepository } from "../../protocols/db/tournament-repository";

export class DbFindAllTournaments implements FindAllTournaments {
  constructor(private readonly tournamentRepository: TournamentRepository) {}

  async findAll(): Promise<Tournament[]> {
    return this.tournamentRepository.findAll();
  }
}
