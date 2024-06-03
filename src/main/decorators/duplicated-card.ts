import { CardTypeOrmRepository } from "../../infra/db/typeorm/card-repository/card";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { duplicatedCard } from "../http/http-helper";

export class CardValidatorDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly CardTypeOrmRepository: CardTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const card = httpRequest.body;
    const isCardExistInDeck =
      await this.CardTypeOrmRepository.isCardExistInDeck(card);

    if (isCardExistInDeck) {
      return duplicatedCard();
    }

    return await this.controller.handle(httpRequest);
  }
}
