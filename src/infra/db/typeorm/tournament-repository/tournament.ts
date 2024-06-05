import AppDataSource from "../db/data-source";
import { TournamentRepository } from "../../../../data/protocols/db/tournament-repository";
import { AddTournamentModel } from "../../../../domain/usecases/add-tournament";
import { Tournament } from "../db/entities/tournament-entity";

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
    await tournamentRepository.delete({ id });

    return null;
  }
}
