import { TournamentPlayer } from "../../infra/db/typeorm/db/entities/tournament-player-entity";

export interface AddTournamentPlayerModel {
  playerId: number;
  tournamentId: number;
}

export interface AddTournamentPlayer {
  register(
    tournamentPlayer: AddTournamentPlayerModel
  ): Promise<TournamentPlayer>;
}
