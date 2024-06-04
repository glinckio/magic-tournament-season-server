import { TournamentTypeOrmRepository } from "../../infra/db/typeorm/tournament-repository/tournament";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { duplicatedTournament } from "../http/http-helper";

export class TournamentValidatorDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly playerTypeOrmRepository: TournamentTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body;
    const duplicatedTournamentWithSameName =
      await this.playerTypeOrmRepository.findByName(name);
    if (duplicatedTournamentWithSameName) {
      return duplicatedTournament();
    }
    return await this.controller.handle(httpRequest);
  }
}
