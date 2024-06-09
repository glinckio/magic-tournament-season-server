import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpResponse } from "../../protocols/http";
import { Controller } from "../../protocols/controller";
import { FindAllTournamentPlayers } from "../../../domain/usecases/find-all-tournament-players";

export class FindAllTournamentPlayersController implements Controller {
  constructor(
    private readonly findAllTournamentPlayer: FindAllTournamentPlayers
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const data = await this.findAllTournamentPlayer.findAll();
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
