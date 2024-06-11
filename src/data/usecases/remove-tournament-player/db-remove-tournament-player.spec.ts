import { AddTournamentPlayerModel } from "../../../domain/usecases/add-tournament-player";
import { TournamentPlayer } from "../../../infra/db/typeorm/db/entities/tournament-player-entity";
import { TournamentPlayerRepository } from "../../protocols/db/tournament-player-repository";
import { DbRemoveTournamentPlayer } from "./db-remove-tournament-player";

const makeTournamentPlayerRepository = (): TournamentPlayerRepository => {
  class DbAddTournamentPlayerStub implements TournamentPlayerRepository {
    register(
      tournamentPlayer: AddTournamentPlayerModel
    ): Promise<TournamentPlayer> {
      throw new Error("Method not implemented.");
    }
    findAll(): Promise<TournamentPlayer[]> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new DbAddTournamentPlayerStub();
};

interface SutTypes {
  sut: DbRemoveTournamentPlayer;
  tournamentRepository: TournamentPlayerRepository;
}

const makeSut = (): SutTypes => {
  const tournamentRepository = makeTournamentPlayerRepository();
  const sut = new DbRemoveTournamentPlayer(tournamentRepository);

  return {
    sut,
    tournamentRepository,
  };
};

describe("DbRemoveTournamentPlayer", () => {
  it("should throws of DbRemoveTournamentPlayer throws", async () => {
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
