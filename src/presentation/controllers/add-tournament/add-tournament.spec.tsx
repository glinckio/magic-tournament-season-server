import { TournamentModel } from "../../../domain/models/tourmanent";
import {
  AddTournament,
  AddTournamentModel,
} from "../../../domain/usecases/add-tournament";
import { MissingParamError } from "../../errors/missing-param-error";
import { ServerError } from "../../errors/server-error";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest } from "../../protocols/http";
import { Validation } from "../../protocols/validation";
import { AddTournamentController } from "./add-tournament";

const makeAddTournament = (): AddTournament => {
  class AddTournamentStub implements AddTournament {
    async add(tournament: AddTournamentModel): Promise<TournamentModel> {
      const fakeTournament = makeFakeTournament();

      return new Promise((resolve) => resolve(fakeTournament));
    }
  }

  return new AddTournamentStub();
};

const makeFakeTournament = (): TournamentModel => ({
  id: 1,
  name: "valid_name",
  startsAt: "valid_date",
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
  sut: AddTournamentController;
  addTournamentStub: AddTournament;
  validationStub: Validation;
}

const makeSut = (): SutTypes => {
  const addTournamentStub = makeAddTournament();
  const validationStub = makeValidation();
  const sut = new AddTournamentController(addTournamentStub, validationStub);

  return {
    sut,
    addTournamentStub,
    validationStub,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    startsAt: "any_date",
  },
});

describe("AddTournament controller", () => {
  it("Should call AddTournamentStub with correct values", async () => {
    const { sut, addTournamentStub } = makeSut();
    const addSpy = jest.spyOn(addTournamentStub, "add");
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      startsAt: "any_date",
    });
  });
  it("should return 500 if AddTournament throws", async () => {
    const { sut, addTournamentStub } = makeSut();
    jest.spyOn(addTournamentStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError()));
  });
  it("should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeTournament()));
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
