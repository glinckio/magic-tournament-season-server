import { CardModel } from "../../../domain/models/card";
import { AddCard, AddCardModel } from "../../../domain/usecases/add-card";
import { MissingParamError } from "../../errors/missing-param-error";
import { ServerError } from "../../errors/server-error";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { Validation } from "../../protocols/validation";
import { AddCardController } from "./add-card";

const makeAddCard = (): AddCard => {
  class AddCardStub implements AddCard {
    async add(pard: AddCardModel): Promise<CardModel> {
      const fakeCard = makeFakeCard();

      return new Promise((resolve) => resolve(fakeCard));
    }
  }

  return new AddCardStub();
};

const makeFakeCard = (): CardModel => ({
  id: 1,
  cardId: "any_cardId",
  name: "any_name",
  image: "any_image",
  colors: "any_colors",
  deck: {
    id: 1,
    cards: [],
    title: "any_title",
  },
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};

interface SutTypes {
  sut: AddCardController;
  addCardStub: AddCard;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const addCardStub = makeAddCard();
  const validationStub = makeValidation();
  const sut = new AddCardController(addCardStub, validationStub);

  return {
    sut,
    addCardStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    cardId: "any_cardId",
    name: "any_name",
    image: "any_image",
    colors: "any_colors",
    deck: {
      id: 1,
    },
  },
});

describe("AddCard controller", () => {
  it("Should call AddCardStub with correct values", async () => {
    const { sut, addCardStub } = makeSut();
    const addSpy = jest.spyOn(addCardStub, "add");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      cardId: "any_cardId",
      name: "any_name",
      image: "any_image",
      colors: "any_colors",
      deck: {
        id: 1,
      },
    });
  });
  it("should return 500 if AddCard throws", async () => {
    const { sut, addCardStub } = makeSut();
    jest.spyOn(addCardStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeCard()));
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
