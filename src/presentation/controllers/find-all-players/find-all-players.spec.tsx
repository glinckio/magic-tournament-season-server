import { PlayerModel } from "../../../domain/models/player";
import { FindAllPlayers } from "../../../domain/usecases/find-all-players";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { FindAllPlayersController } from "./find-all-players";

const makeFakePlayers = (): PlayerModel[] => [
  {
    id: 1,
    name: "valid_name",
    cpf: "valid_cpf",
    email: "valid_email@mail.com",
    password: "valid_password",
    role: "valid_role",
  },
  {
    id: 2,
    name: "valid_name",
    cpf: "valid_cpf",
    email: "valid_email@mail.com",
    password: "valid_password",
    role: "valid_role",
  },
];

const makeFindAllPlayers = (): FindAllPlayers => {
  class FindAllPlayersStub implements FindAllPlayers {
    async findAll(): Promise<PlayerModel[]> {
      const fakePlayers = makeFakePlayers();

      return new Promise((resolve) => resolve(fakePlayers));
    }
  }

  return new FindAllPlayersStub();
};

interface SutTypes {
  sut: FindAllPlayersController;
  findAllPlayersStub: FindAllPlayers;
}

const makeSut = (): SutTypes => {
  const findAllPlayersStub = makeFindAllPlayers();
  const sut = new FindAllPlayersController(findAllPlayersStub);

  return {
    sut,
    findAllPlayersStub,
  };
};

describe("FindAllPlayers controller", () => {
  it("should return 500 if FindAllPlayers throws", async () => {
    const { sut, findAllPlayersStub } = makeSut();
    jest
      .spyOn(findAllPlayersStub, "findAll")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(makeFakePlayers()));
  });
});
