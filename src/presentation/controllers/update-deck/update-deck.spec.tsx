import { DeckModel } from "../../../domain/models/deck";
import {
  UpdateDeck,
  UpdateDeckModel,
} from "../../../domain/usecases/update-deck";
import { Deck } from "../../../infra/db/typeorm/db/entities/deck-entity";
import { MissingParamError } from "../../errors/missing-param-error";
import { ServerError } from "../../errors/server-error";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { Validation } from "../../protocols/validation";
import { UpdateDeckController } from "./update-deck";

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};

const makeFakeDeck = (): DeckModel => ({
  id: 1,
  title: "First deck",
  cards: [],
});

const makeUpdateDeck = (): UpdateDeck => {
  class UpdateDeckStub implements UpdateDeck {
    async update(deck: UpdateDeckModel): Promise<Deck> {
      const fakeDeck = makeFakeDeck();

      return new Promise((resolve) => resolve(fakeDeck));
    }
  }

  return new UpdateDeckStub();
};

interface SutTypes {
  sut: UpdateDeckController;
  updateDeckStub: UpdateDeck;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const updateDeckStub = makeUpdateDeck();
  const validationStub = makeValidation();
  const sut = new UpdateDeckController(updateDeckStub, validationStub);

  return {
    sut,
    updateDeckStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 1,
    title: "First deck",
    player: {
      id: 1,
    },
  },
});

describe("UpdateDeck controller", () => {
  it("should call UpdateDeck with correct values", async () => {
    const { sut, updateDeckStub } = makeSut();
    const addSpy = jest.spyOn(updateDeckStub, "update");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      id: 1,
      title: "First deck",
      player: {
        id: 1,
      },
    });
  });
  it("should return 500 if UpdateDeck throws", async () => {
    const { sut, updateDeckStub } = makeSut();
    jest.spyOn(updateDeckStub, "update").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeDeck()));
  });
  it("should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
  it("should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });
});
