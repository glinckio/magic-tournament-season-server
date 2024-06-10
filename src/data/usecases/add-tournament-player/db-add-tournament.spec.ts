import { TournamentPlayerModel } from "../../../domain/models/tournament-player";
import {
  AddTournamentPlayer,
  AddTournamentPlayerModel,
} from "../../../domain/usecases/add-tournament-player";
import { TournamentPlayer } from "../../../infra/db/typeorm/db/entities/tournament-player-entity";
import { DbAddTournamentPlayer } from "./db-add-tournament-player";

const makeFakeTournamentPlayer = (): TournamentPlayerModel => ({
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
});

const makeTournamentPlayerRepository = (): AddTournamentPlayer => {
  class DbAddTournamentPlayer implements AddTournamentPlayer {
    register(
      tournamentPlayer: AddTournamentPlayerModel
    ): Promise<TournamentPlayer> {
      return new Promise((resolve) => resolve(makeFakeTournamentPlayer()));
    }
  }

  return new DbAddTournamentPlayer();
};

interface SutTypes {
  sut: DbAddTournamentPlayer;
  tournamentPlayerRepository: AddTournamentPlayer;
}

const makeSut = (): SutTypes => {
  const tournamentPlayerRepository = makeTournamentPlayerRepository();
  const sut = new DbAddTournamentPlayer(tournamentPlayerRepository);

  return {
    sut,
    tournamentPlayerRepository,
  };
};

const makeFakeTournamentPlayerData = (): AddTournamentPlayerModel => ({
  playerId: 1,
  tournamentId: 1,
});

describe("DDbAddTournamentPlayer", () => {
  it("should call DbAddTournamentPlayer with correct values", async () => {
    const { sut, tournamentPlayerRepository } = makeSut();
    const addSpy = jest.spyOn(tournamentPlayerRepository, "register");

    await sut.register(makeFakeTournamentPlayerData());
    expect(addSpy).toHaveBeenCalledWith({
      playerId: 1,
      tournamentId: 1,
    });
  });
  it("should throws of DbAddTournamentPlayer throws", async () => {
    const { tournamentPlayerRepository, sut } = makeSut();
    jest
      .spyOn(tournamentPlayerRepository, "register")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.register(makeFakeTournamentPlayerData());
    await expect(promise).rejects.toThrow();
  });
  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.register(makeFakeTournamentPlayerData());
    expect(account).toEqual(makeFakeTournamentPlayer());
  });
});
