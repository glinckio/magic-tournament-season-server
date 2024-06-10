import { PlayerModel } from "../../../domain/models/player";
import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { UpdatePlayerModel } from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { HttpRequest } from "../../../presentation/protocols/http";
import { Hasher } from "../../protocols/criptography/hasher";
import { PlayerRepository } from "../../protocols/db/player-repository";
import { DbAddPlayer } from "./db-add-player";

const makeFakePlayer = (): PlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "valid_password",
  role: "valid_role",
});

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  return new HasherStub();
};

const makePlayerRepository = (): PlayerRepository => {
  class DbAddPlayerStub implements PlayerRepository {
    findAll(): Promise<Player[]> {
      throw new Error("Method not implemented.");
    }
    update(player: UpdatePlayerModel): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    findByCpf(cpf: string): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      throw new Error("Method not implemented.");
    }
    add(playerData: AddPlayerModel): Promise<Player> {
      return new Promise((resolve) => resolve(makeFakePlayer()));
    }
  }

  return new DbAddPlayerStub();
};

interface SutTypes {
  sut: DbAddPlayer;
  hashStub: Hasher;
  playerRepository: PlayerRepository;
}

const makeSut = (): SutTypes => {
  const hashStub = makeHasher();
  const playerRepository = makePlayerRepository();
  const sut = new DbAddPlayer(hashStub, playerRepository);

  return {
    sut,
    hashStub,
    playerRepository,
  };
};

const makeFakePlayerData = (): AddPlayerModel => ({
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "valid_password",
});

describe("DDbAddPlayer", () => {
  it("should call Hasher with correct password", async () => {
    const { hashStub, sut } = makeSut();
    const hashSpy = jest.spyOn(hashStub, "hash");

    await sut.add(makeFakePlayerData());
    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });
  it("should throws of Hasher throws", async () => {
    const { hashStub, sut } = makeSut();
    jest
      .spyOn(hashStub, "hash")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFakePlayerData());
    await expect(promise).rejects.toThrow();
  });
  it("should call DbAddPlayer with correct values", async () => {
    const { sut, playerRepository } = makeSut();
    const addSpy = jest.spyOn(playerRepository, "add");

    await sut.add(makeFakePlayerData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      cpf: "valid_cpf",
      email: "valid_email@mail.com",
      password: "hashed_password",
    });
  });
  it("should throws of DbAddPlayer throws", async () => {
    const { playerRepository, sut } = makeSut();
    jest
      .spyOn(playerRepository, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFakePlayerData());
    await expect(promise).rejects.toThrow();
  });
  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFakePlayerData());
    expect(account).toEqual(makeFakePlayer());
  });
});
