import { TournamentModel } from "../../../domain/models/tourmanent";
import { AddTournamentModel } from "../../../domain/usecases/add-tournament";
import { Tournament } from "../../../infra/db/typeorm/db/entities/tournament-entity";
import { TournamentRepository } from "../../protocols/db/tournament-repository";
import { DbAddTournament } from "./db-add-add-tournament";

const makeFakeTournament = (): TournamentModel => ({
  id: 1,
  name: "valid_name",
  startsAt: "valid_date",
});

const makeTournamentRepository = (): TournamentRepository => {
  class DbAddTournamentStub implements TournamentRepository {
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
      throw new Error("Method not implemented.");
    }
    add(tournamentData: AddTournamentModel): Promise<Tournament> {
      return new Promise((resolve) => resolve(makeFakeTournament()));
    }
  }

  return new DbAddTournamentStub();
};

interface SutTypes {
  sut: DbAddTournament;
  tournamentRepository: TournamentRepository;
}

const makeSut = (): SutTypes => {
  const tournamentRepository = makeTournamentRepository();
  const sut = new DbAddTournament(tournamentRepository);

  return {
    sut,
    tournamentRepository,
  };
};

const makeFakeTournamentData = (): AddTournamentModel => ({
  name: "valid_name",
  startsAt: "valid_date",
});

describe("DDbAddTournament", () => {
  it("should call DbAddTournament with correct values", async () => {
    const { sut, tournamentRepository } = makeSut();
    const addSpy = jest.spyOn(tournamentRepository, "add");

    await sut.add(makeFakeTournamentData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      startsAt: "valid_date",
    });
  });
  it("should throws of DbAddTournament throws", async () => {
    const { tournamentRepository, sut } = makeSut();
    jest
      .spyOn(tournamentRepository, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFakeTournamentData());
    await expect(promise).rejects.toThrow();
  });
  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFakeTournamentData());
    expect(account).toEqual(makeFakeTournament());
  });
});
