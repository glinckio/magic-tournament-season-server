import { TournamentPlayer } from "../../infra/db/typeorm/db/entities/tournament-player-entity";

export interface FindAllTournamentPlayers {
  findAll(): Promise<TournamentPlayer[]>;
}
