import { AddTournamentModel } from "../../../domain/usecases/add-tournament";
import { Tournament } from "../../../infra/db/typeorm/db/entities/tournament-entity";

export interface TournamentRepository {
  add(tournament: AddTournamentModel): Promise<Tournament>;
  findById(id: number): Promise<Tournament>;
  findByName(name: string): Promise<Tournament>;
  findAll(): Promise<Tournament[]>;
  remove(id: number): Promise<null>;
}
