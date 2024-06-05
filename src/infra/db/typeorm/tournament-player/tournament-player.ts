import { TournamentPlayerRepository } from "../../../../data/protocols/db/tournament-player-repository";
import { AddTournamentPlayerModel } from "../../../../domain/usecases/add-tournament-player";
import AppDataSource from "../db/data-source";
import { TournamentPlayer } from "../db/entities/tournament-player-entity";

export class TournamentPlayerTypeOrmRepository
  implements TournamentPlayerRepository
{
  async register(
    tournamentPlayer: AddTournamentPlayerModel
  ): Promise<TournamentPlayer> {
    const { playerId, tournamentId } = tournamentPlayer;
    const tournamentPlayerRepository =
      AppDataSource.getRepository(TournamentPlayer);
    const data = await tournamentPlayerRepository.save({
      player: {
        id: playerId,
      },
      tournament: {
        id: tournamentId,
      },
    });
    return data;
  }
}
