import { CardTypeOrmRepository } from "../../infra/db/typeorm/card-repository/card";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { dataNotFound } from "../http/http-helper";

export class NotExistingCardValidator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly cardTypeOrmRepository: CardTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.body;
    const isCardExists = await this.cardTypeOrmRepository.findById(id);

    if (!isCardExists) {
      return dataNotFound("Card");
    }

    return await this.controller.handle(httpRequest);
  }
}
