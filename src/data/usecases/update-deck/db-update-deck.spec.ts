import { DeckModel } from "../../../domain/models/deck";
import { UpdateDeckModel } from "../../../domain/usecases/update-deck";
import { Deck } from "../../../infra/db/typeorm/db/entities/deck-entity";
import { DeckRepository } from "../../protocols/db/deck-repository";
import { DbUpdateDeck } from "./db-upddate-deck";

const makeDeckData = (): UpdateDeckModel => ({
  id: 1,
  title: "any_title",
  player: {
    id: 1,
    name: "valid_name",
    cpf: "valid_cpf",
    email: "valid_email@mail.com",
    password: "valid_password",
    role: "valid_role",
  },
});

const makeFakeDeck = (): DeckModel => ({
  id: 1,
  title: "any_title",
  player: {
    id: 1,
    name: "valid_name",
    cpf: "valid_cpf",
    email: "valid_email@mail.com",
    password: "valid_password",
    role: "valid_role",
  },
  cards: [],
});

const makeDeckRepository = (): DeckRepository => {
  class DbAddDeckStub implements DeckRepository {
    update(deck: UpdateDeckModel): Promise<Deck> {
      return new Promise((resolve) => resolve(makeFakeDeck()));
    }
  }

  return new DbAddDeckStub();
};

interface SutTypes {
  sut: DbUpdateDeck;
  deckRepository: DeckRepository;
}

const makeSut = (): SutTypes => {
  const deckRepository = makeDeckRepository();
  const sut = new DbUpdateDeck(deckRepository);

  return {
    sut,
    deckRepository,
  };
};

describe("DbUpdateDeck", () => {
  it("should throws of DbUpdateDeck throws", async () => {
    const { deckRepository, sut } = makeSut();
    jest
      .spyOn(deckRepository, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.update(makeDeckData());
    await expect(promise).rejects.toThrow();
  });
  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.update(makeDeckData());
    expect(account).toEqual(makeFakeDeck());
  });
});
