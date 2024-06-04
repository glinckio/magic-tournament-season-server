import { PlayerTypeOrmRepository } from "../../infra/db/typeorm/player-repository/player";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { duplicatedPlayer } from "../http/http-helper";

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
      return duplicatedPlayer("cpf");
    }

    if (duplicatedPlayerByEmail) {
      return duplicatedPlayer("email");
    }
    return await this.controller.handle(httpRequest);
  }
}
