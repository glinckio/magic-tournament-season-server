import { RemoveTournament } from "../../../domain/usecases/remove-tournament";
import { TournamentRepository } from "../../protocols/db/tournament-repository";

export class DbRemoveTournament implements RemoveTournament {
  constructor(private readonly tournamentRepository: TournamentRepository) {}

  async remove(id: number): Promise<null> {
    return this.tournamentRepository.remove(id);
  }
}
