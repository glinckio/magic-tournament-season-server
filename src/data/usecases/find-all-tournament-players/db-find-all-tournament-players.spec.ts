import { TournamentPlayerModel } from "../../../domain/models/tournament-player";
import { AddTournamentPlayerModel } from "../../../domain/usecases/add-tournament-player";
import { TournamentPlayer } from "../../../infra/db/typeorm/db/entities/tournament-player-entity";
import { TournamentPlayerRepository } from "../../protocols/db/tournament-player-repository";
import { DbFindAllTournamentPlayer } from "./db-find-all-tournament-player";

const makeFakeTournamentPlayer = (): TournamentPlayerModel[] => [
  {
    id: 1,
    player: {
      id: 1,
      name: "valid_name",
      cpf: "valid_cpf",
      email: "valid_email@mail.com",
      password: "valid_password",
      role: "valid_role",
    },
    tournament: {
      id: 1,
      name: "valid_name",
      startsAt: "valid_date",
    },
  },
];

const makeTournamentPlayerRepository = (): TournamentPlayerRepository => {
  class DbAddPlayerStub implements TournamentPlayerRepository {
    register(
      tournamentPlayer: AddTournamentPlayerModel
    ): Promise<TournamentPlayer> {
      throw new Error("Method not implemented.");
    }
    findAll(): Promise<TournamentPlayer[]> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      throw new Error("Method not implemented.");
    }
  }

  return new DbAddPlayerStub();
};

interface SutTypes {
  sut: DbFindAllTournamentPlayer;
  tournamentPlayerRepository: TournamentPlayerRepository;
}

const makeSut = (): SutTypes => {
  const tournamentPlayerRepository = makeTournamentPlayerRepository();
  const sut = new DbFindAllTournamentPlayer(tournamentPlayerRepository);

  return {
    sut,
    tournamentPlayerRepository,
  };
};

describe("DbFindAllTournamentPlayer", () => {
  it("should throws of DbFindAllTournamentPlayer throws", async () => {
    const { tournamentPlayerRepository, sut } = makeSut();
    jest
      .spyOn(tournamentPlayerRepository, "findAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.findAll();
    await expect(promise).rejects.toThrow();
  });
  it("should return tournamentPlayer on success", async () => {
    const { tournamentPlayerRepository, sut } = makeSut();
    jest
      .spyOn(tournamentPlayerRepository, "findAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => resolve(makeFakeTournamentPlayer()))
      );
    const account = await sut.findAll();
    expect(account).toEqual(makeFakeTournamentPlayer());
  });
});
