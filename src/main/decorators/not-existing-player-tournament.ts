import { PlayerTypeOrmRepository } from "../../infra/db/typeorm/player-repository/player";
import { TournamentTypeOrmRepository } from "../../infra/db/typeorm/tournament-repository/tournament";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http";
import { dataNotFound } from "../http/http-helper";

export class NotExistingPlayerTournamentValidator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly playerTypeOrmRepository: PlayerTypeOrmRepository,
    private readonly tournamentTypeOrmRepository: TournamentTypeOrmRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { playerId, tournamentId } = httpRequest.query;

    const isPlayerExists = await this.playerTypeOrmRepository.findById(
      playerId
    );

    const isTournamentExists = await this.tournamentTypeOrmRepository.findById(
      tournamentId
    );

    if (!isPlayerExists) {
      return dataNotFound("Player");
    }

    if (!isTournamentExists) {
      return dataNotFound("Tournament");
    }

    return await this.controller.handle(httpRequest);
  }
}
