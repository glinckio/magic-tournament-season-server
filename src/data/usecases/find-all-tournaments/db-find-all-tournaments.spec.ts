import { TournamentModel } from "../../../domain/models/tourmanent";
import { AddTournamentModel } from "../../../domain/usecases/add-tournament";
import { Tournament } from "../../../infra/db/typeorm/db/entities/tournament-entity";
import { TournamentRepository } from "../../protocols/db/tournament-repository";
import { DbFindAllTournaments } from "./db-find-all-tournaments";

const makeFakeTournaments = (): TournamentModel[] => [
  {
    id: 1,
    name: "valid_name",
    startsAt: "valid_date",
  },
  {
    id: 2,
    name: "valid_name",
    startsAt: "valid_date",
  },
];

const makeTournamentRepository = (): TournamentRepository => {
  class DbFindAllTournamentsStub implements TournamentRepository {
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
      return new Promise((resolve) => resolve(makeFakeTournaments()));
    }
    remove(id: number): Promise<null> {
      throw new Error("Method not implemented.");
    }
  }

  return new DbFindAllTournamentsStub();
};

interface SutTypes {
  sut: DbFindAllTournaments;
  tournamentRepository: TournamentRepository;
}

const makeSut = (): SutTypes => {
  const tournamentRepository = makeTournamentRepository();
  const sut = new DbFindAllTournaments(tournamentRepository);

  return {
    sut,
    tournamentRepository,
  };
};

describe("DbFindAllTournaments", () => {
  it("should throws of DbFindAllTournaments throws", async () => {
    const { tournamentRepository, sut } = makeSut();
    jest
      .spyOn(tournamentRepository, "findAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.findAll();
    await expect(promise).rejects.toThrow();
  });
  it("should return tournament on success", async () => {
    const { tournamentRepository, sut } = makeSut();
    jest
      .spyOn(tournamentRepository, "findAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => resolve(makeFakeTournaments()))
      );
    const account = await sut.findAll();
    expect(account).toEqual(makeFakeTournaments());
  });
});
