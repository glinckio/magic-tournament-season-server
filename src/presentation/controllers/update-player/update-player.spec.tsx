import { PlayerModel } from "../../../domain/models/player";
import {
  UpdatePlayer,
  UpdatePlayerModel,
} from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { MissingParamError } from "../../errors/missing-param-error";
import { ServerError } from "../../errors/server-error";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { Validation } from "../../protocols/validation";
import { UpdatePlayerController } from "./update-player";

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};

const makeFakePlayer = (): PlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "valid_password",
  role: "valid_role",
});

const makeUpdatePlayer = (): UpdatePlayer => {
  class UpdatePlayerStub implements UpdatePlayer {
    async update(player: UpdatePlayerModel): Promise<Player> {
      const fakePlayer = makeFakePlayer();

      return new Promise((resolve) => resolve(fakePlayer));
    }
  }

  return new UpdatePlayerStub();
};

interface SutTypes {
  sut: UpdatePlayerController;
  updatePlayerStub: UpdatePlayer;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const updatePlayerStub = makeUpdatePlayer();
  const validationStub = makeValidation();
  const sut = new UpdatePlayerController(updatePlayerStub, validationStub);

  return {
    sut,
    updatePlayerStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 1,
    name: "any_name",
    cpf: "any_cpf",
    email: "any_email@mail.com",
    role: "any_role",
  },
});

describe("UpdatePlayer controller", () => {
  it("should call UpdatePlayer with correct values", async () => {
    const { sut, updatePlayerStub } = makeSut();
    const addSpy = jest.spyOn(updatePlayerStub, "update");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      id: 1,
      name: "any_name",
      cpf: "any_cpf",
      email: "any_email@mail.com",
      role: "any_role",
    });
  });
  it("should return 500 if UpdatePlayer throws", async () => {
    const { sut, updatePlayerStub } = makeSut();
    jest.spyOn(updatePlayerStub, "update").mockImplementationOnce(async () => {
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
