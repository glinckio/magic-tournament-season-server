import AppDataSource from "../db/data-source";
import { TournamentRepository } from "../../../../data/protocols/db/tournament-repository";
import { AddTournamentModel } from "../../../../domain/usecases/add-tournament";
import { Tournament } from "../db/entities/tournament-entity";
import { TournamentPlayer } from "../db/entities/tournament-player-entity";

export class TournamentTypeOrmRepository implements TournamentRepository {
  async add(tournament: AddTournamentModel): Promise<Tournament> {
    const { name, startsAt } = tournament;
    const tournamentRepository = AppDataSource.getRepository(Tournament);
    const data = await tournamentRepository.save({ name, startsAt });
    return data;
  }
  async findById(id: number): Promise<Tournament> {
    const tournamentRepository = AppDataSource.getRepository(Tournament);
    const data = await tournamentRepository.findOneBy({ id });
    return data;
  }
  async findAll(): Promise<Tournament[]> {
    const tournamentRepository = AppDataSource.getRepository(Tournament);
    const data = await tournamentRepository.find();
    return data;
  }
  async findByName(name: string): Promise<Tournament> {
    const tournamentRepository = AppDataSource.getRepository(Tournament);
    const data = await tournamentRepository.findOneBy({ name });
    return data;
  }
  async remove(id: number): Promise<null> {
    const tournamentRepository = AppDataSource.getRepository(Tournament);
    const tournamentPlayerRepository =
      AppDataSource.getRepository(TournamentPlayer);

    const tournament = await tournamentRepository.findOneBy({ id });
    const tournaments = await tournamentPlayerRepository.find({
      where: { tournament: { id: tournament.id } },
    });

    for (let i = 0; i < tournaments.length; i++) {
      await tournamentPlayerRepository.delete({ id: tournaments[i].id });
    }

    await tournamentRepository.delete({ id });

    return null;
  }
}
