import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwt-adapter";
import { PlayerModel } from "../../../domain/models/player";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return "any_token";
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter("secret");
};

const makeFakePlayer = (): PlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "valid_password",
  role: "valid_role",
});

describe("Jwt Adapter", () => {
  test("should call sign with correct values", async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt(makeFakePlayer());
    expect(signSpy).toHaveBeenCalledWith(
      JSON.stringify(makeFakePlayer()),
      "secret"
    );
  });
  test("should return a token on sign success", async () => {
    const sut = makeSut();
    const accessToken = await sut.encrypt(makeFakePlayer());
    expect(accessToken).toBe("any_token");
  });
  test("should throw if sign throws", async () => {
    const sut = makeSut();
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt(makeFakePlayer());
    await expect(promise).rejects.toThrow();
  });
});
