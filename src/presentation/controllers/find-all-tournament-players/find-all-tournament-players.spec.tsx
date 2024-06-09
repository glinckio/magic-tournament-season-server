import { TournamentPlayersModel } from "../../../domain/models/tournament-player";
import { FindAllTournamentPlayers } from "../../../domain/usecases/find-all-tournament-players";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { FindAllTournamentPlayersController } from "./find-all-tournament-players";

const makeFakeTournamentPlayers = (): TournamentPlayersModel[] => [
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
  {
    id: 2,
    player: {
      id: 2,
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

const makeFindAllTournamentPlayers = (): FindAllTournamentPlayers => {
  class FindAllTournamentPlayersStub implements FindAllTournamentPlayers {
    async findAll(): Promise<TournamentPlayersModel[]> {
      const fakeTournamentPlayers = makeFakeTournamentPlayers();

      return new Promise((resolve) => resolve(fakeTournamentPlayers));
    }
  }

  return new FindAllTournamentPlayersStub();
};

interface SutTypes {
  sut: FindAllTournamentPlayersController;
  findAllTournamentPlayersStub: FindAllTournamentPlayers;
}

const makeSut = (): SutTypes => {
  const findAllTournamentPlayersStub = makeFindAllTournamentPlayers();
  const sut = new FindAllTournamentPlayersController(
    findAllTournamentPlayersStub
  );

  return {
    sut,
    findAllTournamentPlayersStub,
  };
};

describe("FindAllTournamentPlayers controller", () => {
  it("should return 500 if FindAllTournamentPlayers throws", async () => {
    const { sut, findAllTournamentPlayersStub } = makeSut();
    jest
      .spyOn(findAllTournamentPlayersStub, "findAll")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(makeFakeTournamentPlayers()));
  });
});
