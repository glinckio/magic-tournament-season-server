import { PlayerModel } from "../../../domain/models/player";
import { AddPlayerModel } from "../../../domain/usecases/add-player";
import { UpdatePlayerModel } from "../../../domain/usecases/update-player";
import { Player } from "../../../infra/db/typeorm/db/entities/player-entity";
import { PlayerRepository } from "../../protocols/db/player-repository";
import { DbRemovePlayer } from "./db-remove-player";

const makePlayerRepository = (): PlayerRepository => {
  class DbAddPlayerStub implements PlayerRepository {
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
  sut: DbRemovePlayer;
  playerRepository: PlayerRepository;
}

const makeSut = (): SutTypes => {
  const playerRepository = makePlayerRepository();
  const sut = new DbRemovePlayer(playerRepository);

  return {
    sut,
    playerRepository,
  };
};

describe("DbRemovePlayer", () => {
  it("should throws of DbRemovePlayer throws", async () => {
    const id = 1;
    const { playerRepository, sut } = makeSut();
    jest
      .spyOn(playerRepository, "remove")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.remove(id);
    await expect(promise).rejects.toThrow();
  });
  it("should return null on success", async () => {
    const id = 1;
    const { playerRepository, sut } = makeSut();
    jest
      .spyOn(playerRepository, "remove")
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)));
    const account = await sut.remove(id);
    expect(account).toEqual(null);
  });
});
