import { PlayerModel } from "../../../domain/models/player";
import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { UpdatePlayerModel } from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { HttpRequest } from "../../../presentation/protocols/http";
import { Hasher } from "../../protocols/criptography/hasher";
import { PlayerRepository } from "../../protocols/db/player-repository";
import { DbFindAllPlayers } from "./db-find-all-players";

const makeFakePlayers = (): PlayerModel[] => [
  {
    id: 1,
    name: "valid_name",
    cpf: "valid_cpf",
    email: "valid_email@mail.com",
    password: "valid_password",
    role: "valid_role",
  },
  {
    id: 2,
    name: "valid_name",
    cpf: "valid_cpf",
    email: "valid_email@mail.com",
    password: "valid_password",
    role: "valid_role",
  },
];

const makePlayerRepository = (): PlayerRepository => {
  class DbAddPlayerStub implements PlayerRepository {
    findAll(): Promise<Player[]> {
      return new Promise((resolve) => resolve(makeFakePlayers()));
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
      throw new Error("Method not implemented.");
    }
  }

  return new DbAddPlayerStub();
};

interface SutTypes {
  sut: DbFindAllPlayers;
  playerRepository: PlayerRepository;
}

const makeSut = (): SutTypes => {
  const playerRepository = makePlayerRepository();
  const sut = new DbFindAllPlayers(playerRepository);

  return {
    sut,
    playerRepository,
  };
};

describe("DbFindAllPlayers", () => {
  it("should throws of DbFindAllPlayers throws", async () => {
    const { playerRepository, sut } = makeSut();
    jest
      .spyOn(playerRepository, "findAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.findAll();
    await expect(promise).rejects.toThrow();
  });
  it("should return players on success", async () => {
    const { playerRepository, sut } = makeSut();
    jest
      .spyOn(playerRepository, "findAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => resolve(makeFakePlayers()))
      );
    const account = await sut.findAll();
    expect(account).toEqual(makeFakePlayers());
  });
});
