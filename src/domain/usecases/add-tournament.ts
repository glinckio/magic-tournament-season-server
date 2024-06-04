import { Player } from "../../infra/db/typeorm/db/entities/player-entity";
import { Tournament } from "../../infra/db/typeorm/db/entities/tournament-entity";

export interface AddTournamentModel {
  name: string;
  startsAt: string;
  players?: Player[];
}

export interface AddTournament {
  add(tournament: AddTournamentModel): Promise<Tournament>;
}
