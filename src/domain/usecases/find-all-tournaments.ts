import { Tournament } from "../../infra/db/typeorm/db/entities/tournament-entity";

export interface FindAllTournaments {
  findAll(): Promise<Tournament[]>;
}
