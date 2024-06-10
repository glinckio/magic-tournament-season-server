import { CardModel } from "../../../domain/models/card";
import { AddCardModel } from "../../../domain/usecases/add-card";
import { Card } from "../../../infra/db/typeorm/db/entities/card-entity";
import { CardRepository } from "../../protocols/db/card-repository";
import { DbAddCard } from "./db-add-card";

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

const makeFakeCardData = (): AddCardModel => ({
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
    findById(id: number): Promise<Card> {
      throw new Error("Method not implemented.");
    }
    findAll(): Promise<Card[]> {
      throw new Error("Method not implemented.");
    }
    findByCpf(cpf: string): Promise<Card> {
      throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<Card> {
      throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<null> {
      throw new Error("Method not implemented.");
    }
    add(cardData: AddCardModel): Promise<Card> {
      return new Promise((resolve) => resolve(makeFakeCard()));
    }
  }

  return new DbAddCardStub();
};

interface SutTypes {
  sut: DbAddCard;
  cardRepository: CardRepository;
}

const makeSut = (): SutTypes => {
  const cardRepository = makeCardRepository();
  const sut = new DbAddCard(cardRepository);

  return {
    sut,
    cardRepository,
  };
};

describe("DbAddCard", () => {
  it("should call DbAddCard with correct values", async () => {
    const { sut, cardRepository } = makeSut();
    const addSpy = jest.spyOn(cardRepository, "add");

    await sut.add(makeFakeCardData());
    expect(addSpy).toHaveBeenCalledWith({
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
  });
  it("should throws of DbAddCard throws", async () => {
    const { cardRepository, sut } = makeSut();
    jest
      .spyOn(cardRepository, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFakeCardData());
    await expect(promise).rejects.toThrow();
  });
  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFakeCardData());
    expect(account).toEqual(makeFakeCard());
  });
});
