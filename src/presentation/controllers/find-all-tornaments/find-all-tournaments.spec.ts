import { TournamentModel } from "../../../domain/models/tourmanent";
import { FindAllTournaments } from "../../../domain/usecases/find-all-tournaments";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { FindAllTournamentsController } from "./find-all-tournaments";

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

const makeFindAllTournaments = (): FindAllTournaments => {
  class FindAllTournamentsStub implements FindAllTournaments {
    async findAll(): Promise<TournamentModel[]> {
      const fakeTournaments = makeFakeTournaments();

      return new Promise((resolve) => resolve(fakeTournaments));
    }
  }

  return new FindAllTournamentsStub();
};

interface SutTypes {
  sut: FindAllTournamentsController;
  findAllTournamentsStub: FindAllTournaments;
}

const makeSut = (): SutTypes => {
  const findAllTournamentsStub = makeFindAllTournaments();
  const sut = new FindAllTournamentsController(findAllTournamentsStub);

  return {
    sut,
    findAllTournamentsStub,
  };
};

describe("FindAllTournaments controller", () => {
  it("should return 500 if FindAllTournaments throws", async () => {
    const { sut, findAllTournamentsStub } = makeSut();
    jest
      .spyOn(findAllTournamentsStub, "findAll")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(makeFakeTournaments()));
  });
});
