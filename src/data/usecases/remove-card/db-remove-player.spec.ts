import { CardModel } from "../../../domain/models/card";
import { AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card-entity";
import { CardRepository } from "../../protocols/db/card-repository";
import { DbRemoveCard } from "./db-remove-player";

const makeFakeCard = (): CardModel => ({
  id: 1,
  cardId: "valid_cardId",
  name: "valid_name",
  image: "valid_image",
  colors: "valid_colors",
  deck: {
    id: 1,
    title: "",
    cards: [],
  },
});

const makeCardRepository = (): CardRepository => {
  class DbAddCardStub implements CardRepository {
    add(card: AddCardModel): Promise<Card> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      return new Promise((resolve) => resolve(null));
    }
    findById(id: number): Promise<Card> {
      throw new Error("Method not implemented.");
    }
  }

  return new DbAddCardStub();
};

interface SutTypes {
  sut: DbRemoveCard;
  cardRepository: CardRepository;
}

const makeSut = (): SutTypes => {
  const cardRepository = makeCardRepository();
  const sut = new DbRemoveCard(cardRepository);

  return {
    sut,
    cardRepository,
  };
};

describe("DbRemoveCard", () => {
  it("should throws of DbRemoveCard throws", async () => {
    const id = 1;
    const { cardRepository, sut } = makeSut();
    jest
      .spyOn(cardRepository, "remove")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.remove(id);
    await expect(promise).rejects.toThrow();
  });
  it("should return null on success", async () => {
    const id = 1;
    const { cardRepository, sut } = makeSut();
    jest
      .spyOn(cardRepository, "remove")
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(null)));
    const account = await sut.remove(id);
    expect(account).toEqual(null);
  });
});
