import { TournamentPlayerModel } from "../../../domain/models/tournament-player";
import {
  AddTournamentPlayer,
  AddTournamentPlayerModel,
} from "../../../domain/usecases/add-tournament-player";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { AddTournamentPlayerController } from "./add-tournament-player";

const makeAddTournamentPlayer = (): AddTournamentPlayer => {
  class AddTournamentPlayerStub implements AddTournamentPlayer {
    async register(
      tournamentPlayer: AddTournamentPlayerModel
    ): Promise<TournamentPlayerModel> {
      const fakeTournamentPlayer = makeFakeTournamentPlayer();

      return new Promise((resolve) => resolve(fakeTournamentPlayer));
    }
  }

  return new AddTournamentPlayerStub();
};

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

interface SutTypes {
  sut: AddTournamentPlayerController;
  addTournamentPlayerStub: AddTournamentPlayer;
}

const makeSut = (): SutTypes => {
  const addTournamentPlayerStub = makeAddTournamentPlayer();
  const sut = new AddTournamentPlayerController(addTournamentPlayerStub);

  return {
    sut,
    addTournamentPlayerStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  query: {
    playerId: 1,
    tournamentId: 1,
  },
});

describe("AddTournamentPlayer controller", () => {
  it("Should call AddTournamentPlayerStub with correct values", async () => {
    const { sut, addTournamentPlayerStub } = makeSut();
    const addSpy = jest.spyOn(addTournamentPlayerStub, "register");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      playerId: 1,
      tournamentId: 1,
    });
  });
  it("should return 500 if AddTournamentPlayer throws", async () => {
    const { sut, addTournamentPlayerStub } = makeSut();
    jest
      .spyOn(addTournamentPlayerStub, "register")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeTournamentPlayer()));
  });
});
