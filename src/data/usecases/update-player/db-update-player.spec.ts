import { PlayerModel } from "../../../domain/models/player";
import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { UpdatePlayerModel } from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { PlayerRepository } from "../../protocols/db/player-repository";
import { DbUpdatePlayer } from "./db-update-player";

const makePlayerData = (): UpdatePlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  role: "valid_role",
});

const makeFakePlayer = (): PlayerModel => ({
  id: 1,
  name: "valid_name",
  cpf: "valid_cpf",
  email: "valid_email@mail.com",
  password: "valid_password",
  role: "valid_role",
});

const makePlayerRepository = (): PlayerRepository => {
  class DbAddPlayerStub implements PlayerRepository {
    findAll(): Promise<Player[]> {
      throw new Error("Method not implemented.");
    }
    add(player: AddPlayerModel): Promise<Player> {
      throw new Error("Method not implemented.");
    }
    update(player: UpdatePlayerModel): Promise<Player> {
      return new Promise((resolve) => resolve(makeFakePlayer()));
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
  }

  return new DbAddPlayerStub();
};

interface SutTypes {
  sut: DbUpdatePlayer;
  playerRepository: PlayerRepository;
}

const makeSut = (): SutTypes => {
  const playerRepository = makePlayerRepository();
  const sut = new DbUpdatePlayer(playerRepository);

  return {
    sut,
    playerRepository,
  };
};

describe("DbUpdatePlayer", () => {
  it("should throws of DbUpdatePlayer throws", async () => {
    const { playerRepository, sut } = makeSut();
    jest
      .spyOn(playerRepository, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.update(makePlayerData());
    await expect(promise).rejects.toThrow();
  });
  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.update(makePlayerData());
    expect(account).toEqual(makeFakePlayer());
  });
});
