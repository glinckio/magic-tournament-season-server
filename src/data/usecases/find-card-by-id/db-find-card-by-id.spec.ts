import { CardModel } from "../../../domain/models/card";
import { AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card-entity";
import { CardRepository } from "../../protocols/db/card-repository";
import { DbFindCardByIdTournaments } from "./db-find-card-by-id";

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
      throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Card> {
      return new Promise((resolve) => resolve(makeFakeCard()));
    }
  }

  return new DbAddCardStub();
};

interface SutTypes {
  sut: DbFindCardByIdTournaments;
  cardRepository: CardRepository;
}

const makeSut = (): SutTypes => {
  const cardRepository = makeCardRepository();
  const sut = new DbFindCardByIdTournaments(cardRepository);

  return {
    sut,
    cardRepository,
  };
};

describe("DbFindCardByIdTournaments", () => {
  it("should throws of DbFindCardByIdTournaments throws", async () => {
    const id = 1;
    const { cardRepository, sut } = makeSut();
    jest
      .spyOn(cardRepository, "findById")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.findById(id);
    await expect(promise).rejects.toThrow();
  });
  it("should return cards on success", async () => {
    const id = 1;
    const { cardRepository, sut } = makeSut();
    jest
      .spyOn(cardRepository, "findById")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => resolve(makeFakeCard()))
      );
    const account = await sut.findById(id);
    expect(account).toEqual(makeFakeCard());
  });
});
