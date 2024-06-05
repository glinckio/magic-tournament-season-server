import { AddTournamentPlayerModel } from "../../../domain/usecases/add-tournament-player";
import { TournamentPlayer } from "../../../infra/db/typeorm/db/entities/tournament-player-entity";

export interface TournamentPlayerRepository {
  register(
    tournamentPlayer: AddTournamentPlayerModel
  ): Promise<TournamentPlayer>;
  findAll(): Promise<TournamentPlayer[]>;
}
