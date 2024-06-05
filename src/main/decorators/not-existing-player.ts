import { PlayerTypeOrmRepository } from "../../infra/db/typeorm/player-repository/player";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { dataNotFound } from "../http/http-helper";

export class NotExistingPlayerValidator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly playerTypeOrmRepository: PlayerTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { cpf } = httpRequest.body;
    const isPlayerExists = await this.playerTypeOrmRepository.findByCpf(cpf);

    if (isPlayerExists) {
      return dataNotFound("Player");
    }

    return await this.controller.handle(httpRequest);
  }
}
