import { AddTournamentPlayer } from "../../../domain/usecases/add-tournament-player";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class AddTournamentPlayerController implements Controller {
  constructor(private readonly addTournamentPlayer: AddTournamentPlayer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { playerId, tournamentId } = httpRequest.query;
      const data = await this.addTournamentPlayer.register({
        playerId,
        tournamentId,
      });
      return ok(data);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
