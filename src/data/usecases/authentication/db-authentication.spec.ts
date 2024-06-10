import { PlayerModel } from "../../../domain/models/player";
import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { AuthenticationModel } from "../../../domain/usecases/authentication";
import { UpdatePlayerModel } from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { Encypter } from "../../protocols/criptography/encypter";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { PlayerRepository } from "../../protocols/db/player-repository";
import { DbAuthentication } from "./db-authentication";

const makeFakePlayer = (): PlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "hashed_password",
  role: "valid_role",
});

const makeAuthentication = (): AuthenticationModel => ({
  email: "any_email@mail.com",
  password: "any_password",
});

const makePlayerRepository = (): PlayerRepository => {
  class PlayerRepositoryStub implements PlayerRepository {
    findByEmail(email: string): Promise<Player> {
      return new Promise((res) => res(makeFakePlayer()));
    }
    findAll(): Promise<Player[]> {
      throw new Error("Method not implemented.");
    }
    add(player: AddPlayerModel): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    update(player: UpdatePlayerModel): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    findByCpf(cpf: string): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      throw new Error("Method not implemented.");
    }
  }

  return new PlayerRepositoryStub();
};

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((res) => res(true));
    }
  }

  return new HashComparerStub();
};

const makeEncypter = (): Encypter => {
  class EncypterStub implements Encypter {
    async verify(token: string): Promise<{ decoded: Player; error: string }> {
      throw new Error("Method not implemented.");
    }
    async encrypt(id: string): Promise<string> {
      return new Promise((res) => res("any_token"));
    }
  }

  return new EncypterStub();
};

interface SutTypes {
  sut: DbAuthentication;
  playerRepository: PlayerRepository;
  hashCompareStub: HashComparer;
  encypterStub: Encypter;
}

const makeSut = (): SutTypes => {
  const hashCompareStub = makeHashComparer();
  const playerRepository = makePlayerRepository();
  const encypterStub = makeEncypter();
  const sut = new DbAuthentication(
    playerRepository,
    hashCompareStub,
    encypterStub
  );

  return {
    sut,
    playerRepository,
    hashCompareStub,
    encypterStub,
  };
};

describe("DbAuthentication Usecase", () => {
  it("should call PlayerRepository with correct email", async () => {
    const { sut, playerRepository } = makeSut();
    const loadSpy = jest.spyOn(playerRepository, "findByEmail");
    await sut.auth(makeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
  it("should throw if PlayerRepository throws", async () => {
    const { sut, playerRepository } = makeSut();
    jest
      .spyOn(playerRepository, "findByEmail")
      .mockReturnValueOnce(new Promise((res, rej) => rej(new Error())));
    const promise = sut.auth(makeAuthentication());
    await expect(promise).rejects.toThrow();
  });
  it("should return null if PlayerRepository returns null", async () => {
    const { sut, playerRepository } = makeSut();
    jest.spyOn(playerRepository, "findByEmail").mockReturnValueOnce(null);
    const accessToken = await sut.auth(makeAuthentication());
    expect(accessToken).toBeNull();
  });
  it("should call HashCompare with correct password", async () => {
    const { sut, hashCompareStub } = makeSut();
    const compareSpy = jest.spyOn(hashCompareStub, "compare");
    await sut.auth(makeAuthentication());
    expect(compareSpy).toHaveBeenCalledWith("any_password", "hashed_password");
  });
  it("should throw if HashCompare throws", async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, "compare")
      .mockReturnValueOnce(new Promise((res, rej) => rej(new Error())));
    const promise = sut.auth(makeAuthentication());
    await expect(promise).rejects.toThrow();
  });
  it("should return null if HashCompare returns null", async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, "compare")
      .mockReturnValueOnce(new Promise((res) => res(false)));
    const accessToken = await sut.auth(makeAuthentication());
    expect(accessToken).toBeNull();
  });
  it("should call Encypter with correct values", async () => {
    const { sut, encypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encypterStub, "encrypt");
    await sut.auth(makeAuthentication());
    expect(encryptSpy).toHaveBeenCalledWith({
      id: 1,
      name: "valid_name",
      cpf: "valid_cpf",
      email: "valid_email@mail.com",
      password: "hashed_password",
      role: "valid_role",
    });
  });
  it("should throw if Encypter throws", async () => {
    const { sut, encypterStub } = makeSut();
    jest
      .spyOn(encypterStub, "encrypt")
      .mockReturnValueOnce(new Promise((res, rej) => rej(new Error())));
    const promise = sut.auth(makeAuthentication());
    await expect(promise).rejects.toThrow();
  });
  it("should call authentication with correct credentials", async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(makeAuthentication());
    expect(accessToken).toBe("any_token");
  });
});
