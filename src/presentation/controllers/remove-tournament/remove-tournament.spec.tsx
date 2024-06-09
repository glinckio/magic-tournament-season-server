import { RemoveTournament } from "../../../domain/usecases/remove-tournament";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { RemoveTournamentController } from "./remove-tournament";

const makeRemoveTournament = (): RemoveTournament => {
  class RemoveTournamentStub implements RemoveTournament {
    async remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new RemoveTournamentStub();
};

interface SutTypes {
  sut: RemoveTournamentController;
  removeCardStub: RemoveTournament;
}

const makeSut = (): SutTypes => {
  const removeCardStub = makeRemoveTournament();
  const sut = new RemoveTournamentController(removeCardStub);

  return {
    sut,
    removeCardStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 1,
  },
});

describe("RemoveTournament controller", () => {
  it("Should call RemoveTournamentStub with correct id", async () => {
    const { sut, removeCardStub } = makeSut();
    const addSpy = jest.spyOn(removeCardStub, "remove");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().params.id);
  });
  it("should return 500 if RemoveTournament throws", async () => {
    const { sut, removeCardStub } = makeSut();
    jest.spyOn(removeCardStub, "remove").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(null));
  });
});
