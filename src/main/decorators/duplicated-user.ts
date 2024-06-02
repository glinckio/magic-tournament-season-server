import { PlayerTypeOrmRepository } from "../../infra/db/typeorm/player-repository/player";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { DuplicatedPlayerError } from "../errors/duplicated-data";

export class PlayerValidatorDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly playerTypeOrmRepository: PlayerTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { cpf, email } = httpRequest.body;

    const duplicatedPlayerByCpf = await this.playerTypeOrmRepository.findByCpf(
      cpf
    );
    const duplicatedPlayerByEmail =
      await this.playerTypeOrmRepository.findByEmail(email);

    if (duplicatedPlayerByCpf) {
      return {
        statusCode: 409,
        body: new DuplicatedPlayerError("cpf"),
      };
    }

    if (duplicatedPlayerByEmail) {
      return {
        statusCode: 409,
        body: new DuplicatedPlayerError("email"),
      };
    }
    return await this.controller.handle(httpRequest);
  }
}
