import { RemovePlayer } from "../../../domain/usecases/remove-player";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { RemovePlayerController } from "./remove-player";

const makeRemovePlayer = (): RemovePlayer => {
  class RemovePlayerStub implements RemovePlayer {
    async remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new RemovePlayerStub();
};

interface SutTypes {
  sut: RemovePlayerController;
  removeCardStub: RemovePlayer;
}

const makeSut = (): SutTypes => {
  const removeCardStub = makeRemovePlayer();
  const sut = new RemovePlayerController(removeCardStub);

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

describe("RemovePlayer controller", () => {
  it("Should call RemovePlayerStub with correct id", async () => {
    const { sut, removeCardStub } = makeSut();
    const addSpy = jest.spyOn(removeCardStub, "remove");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().params.id);
  });
  it("should return 500 if RemovePlayer throws", async () => {
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
