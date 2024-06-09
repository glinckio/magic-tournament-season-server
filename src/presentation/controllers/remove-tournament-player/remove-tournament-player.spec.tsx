import { RemoveTournamentPlayer } from "../../../domain/usecases/remove-tournament-player";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { RemoveTournamentPlayerController } from "./remove-tournament-player";

const makeRemoveTournamentPlayer = (): RemoveTournamentPlayer => {
  class RemoveTournamentPlayerStub implements RemoveTournamentPlayer {
    async remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new RemoveTournamentPlayerStub();
};

interface SutTypes {
  sut: RemoveTournamentPlayerController;
  removeCardStub: RemoveTournamentPlayer;
}

const makeSut = (): SutTypes => {
  const removeCardStub = makeRemoveTournamentPlayer();
  const sut = new RemoveTournamentPlayerController(removeCardStub);

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

describe("RemoveTournamentPlayer controller", () => {
  it("Should call RemoveTournamentPlayerStub with correct id", async () => {
    const { sut, removeCardStub } = makeSut();
    const addSpy = jest.spyOn(removeCardStub, "remove");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().params.id);
  });
  it("should return 500 if RemoveTournamentPlayer throws", async () => {
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
