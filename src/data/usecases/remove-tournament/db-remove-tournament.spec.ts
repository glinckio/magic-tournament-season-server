import { AddTournamentModel } from "../../../domain/usecases/add-tournament";
import { Tournament } from "../../../infra/db/typeorm/db/entities/tournament-entity";
import { TournamentRepository } from "../../protocols/db/tournament-repository";
import { DbRemoveTournament } from "./db-remove-tournament";

const makeTournamentRepository = (): TournamentRepository => {
  class DbAddTournamentStub implements TournamentRepository {
    add(tournament: AddTournamentModel): Promise<Tournament> {
      throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Tournament> {
      throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<Tournament> {
      throw new Error("Method not implemented.");
    }
    findAll(): Promise<Tournament[]> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new DbAddTournamentStub();
};

interface SutTypes {
  sut: DbRemoveTournament;
  tournamentRepository: TournamentRepository;
}

const makeSut = (): SutTypes => {
  const tournamentRepository = makeTournamentRepository();
  const sut = new DbRemoveTournament(tournamentRepository);

  return {
    sut,
    tournamentRepository,
  };
};

describe("DbRemoveTournament", () => {
  it("should throws of DbRemoveTournament throws", async () => {
    const id = 1;
    const { tournamentRepository, sut } = makeSut();
    jest
      .spyOn(tournamentRepository, "remove")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.remove(id);
    await expect(promise).rejects.toThrow();
  });
  it("should return null on success", async () => {
    const id = 1;
    const { tournamentRepository, sut } = makeSut();
    jest
      .spyOn(tournamentRepository, "remove")
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)));
    const account = await sut.remove(id);
    expect(account).toEqual(null);
  });
});
