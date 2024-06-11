import { FindAllTournamentPlayers } from "../../../domain/usecases/find-all-tournament-players";
import { TournamentPlayer } from "../../../infra/db/typeorm/db/entities/tournament-player-entity";
import { TournamentPlayerRepository } from "../../protocols/db/tournament-player-repository";

export class DbFindAllTournamentPlayer implements FindAllTournamentPlayers {
  constructor(
    private readonly tournamentPlayerRepository: TournamentPlayerRepository
  ) {}

  async findAll(): Promise<TournamentPlayer[]> {
    return this.tournamentPlayerRepository.findAll();
  }
}
