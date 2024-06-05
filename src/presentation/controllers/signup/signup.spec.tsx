import { PlayerModel } from "../../../domain/models/player";
import { AddPlayer, AddPlayerModel } from "../../../domain/usecases/add-player";
import { MissingParamError } from "../../errors/missing-param-error";
import { ServerError } from "../../errors/server-error";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { Validation } from "../../protocols/validation";
import { SignUpController } from "./signup";

const makeAddPlayer = (): AddPlayer => {
  class AddPlayerStub implements AddPlayer {
    async add(player: AddPlayerModel): Promise<PlayerModel> {
      const fakePlayer = makeFakePlayer();

      return new Promise((resolve) => resolve(fakePlayer));
    }
  }

  return new AddPlayerStub();
};

const makeFakePlayer = (): PlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "valid_password",
  role: "valid_role",
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
  sut: SignUpController;
  addPlayerStub: AddPlayer;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const addPlayerStub = makeAddPlayer();
  const validationStub = makeValidation();
  const sut = new SignUpController(addPlayerStub, validationStub);

  return {
    sut,
    addPlayerStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    cpf: "any_cpf",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

describe("SignUp controller", () => {
  it("Should call AddPlayerStub with correct values", async () => {
    const { sut, addPlayerStub } = makeSut();
    const addSpy = jest.spyOn(addPlayerStub, "add");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      cpf: "any_cpf",
      email: "any_email@mail.com",
      password: "any_password",
    });
  });
  it("should return 500 if AddPlayer throws", async () => {
    const { sut, addPlayerStub } = makeSut();
    jest.spyOn(addPlayerStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakePlayer()));
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
