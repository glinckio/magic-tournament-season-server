import {
  AddTournament,
  AddTournamentModel,
} from "../../../domain/usecases/add-tournament";
import { Tournament } from "../../../infra/db/typeorm/db/entities/tournament-entity";
import { TournamentRepository } from "../../protocols/db/tournament-repository";

export class DbAddTournament implements AddTournament {
  constructor(private readonly tournamentRepository: TournamentRepository) {}

  async add(tournamentData: AddTournamentModel): Promise<Tournament> {
    return this.tournamentRepository.add(tournamentData);
  }
}
