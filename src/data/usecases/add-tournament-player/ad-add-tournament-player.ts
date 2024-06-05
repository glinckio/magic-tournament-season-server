import {
  AddTournamentPlayer,
  AddTournamentPlayerModel,
} from "../../../domain/usecases/add-tournament-player";
import { TournamentPlayer } from "../../../infra/db/typeorm/db/entities/tournament-player-entity";
import { TournamentPlayerRepository } from "../../protocols/db/tournament-player-repository";

export class DbAddTournamentPlayer implements AddTournamentPlayer {
  constructor(
    private readonly tournamentRepository: TournamentPlayerRepository
  ) {}

  async register(
    tournamentData: AddTournamentPlayerModel
  ): Promise<TournamentPlayer> {
    return this.tournamentRepository.register(tournamentData);
  }
}
