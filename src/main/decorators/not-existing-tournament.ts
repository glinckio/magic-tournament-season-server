import { TournamentTypeOrmRepository } from "../../infra/db/typeorm/tournament-repository/tournament";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { dataNotFound } from "../http/http-helper";

export class NotExistingTournamentValidator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly tournamentTypeOrmRepository: TournamentTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const isTournamentExists = await this.tournamentTypeOrmRepository.findById(
      id
    );

    if (!isTournamentExists) {
      return dataNotFound("Tournament");
    }

    return await this.controller.handle(httpRequest);
  }
}
