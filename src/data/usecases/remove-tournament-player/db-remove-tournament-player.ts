import { RemoveTournamentPlayer } from "../../../domain/usecases/remove-tournament-player";
import { TournamentPlayerRepository } from "../../protocols/db/tournament-player-repository";

export class DbRemoveTournamentPlayer implements RemoveTournamentPlayer {
  constructor(
    private readonly tournamentPlayerRepository: TournamentPlayerRepository
  ) {}

  async remove(id: number): Promise<null> {
    return this.tournamentPlayerRepository.remove(id);
  }
}
