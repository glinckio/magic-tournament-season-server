import { RemoveCard } from "../../../domain/usecases/remove-card";
import { ServerError } from "../../errors/server-error";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { RemoveCardController } from "./remove-card";

const makeRemoveCard = (): RemoveCard => {
  class RemoveCardStub implements RemoveCard {
    async remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
  }

  return new RemoveCardStub();
};

interface SutTypes {
  sut: RemoveCardController;
  removeCardStub: RemoveCard;
}

const makeSut = (): SutTypes => {
  const removeCardStub = makeRemoveCard();
  const sut = new RemoveCardController(removeCardStub);

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

describe("RemoveCard controller", () => {
  it("Should call RemoveCardStub with correct id", async () => {
    const { sut, removeCardStub } = makeSut();
    const addSpy = jest.spyOn(removeCardStub, "remove");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().params.id);
  });
  it("should return 500 if RemoveCard throws", async () => {
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
