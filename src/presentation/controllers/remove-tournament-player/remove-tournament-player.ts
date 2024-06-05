import { RemoveTournamentPlayer } from "../../../domain/usecases/remove-tournament-player";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class RemoveTournamentPlayerController implements Controller {
  constructor(
    private readonly removeTournamentPlayer: RemoveTournamentPlayer
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.removeTournamentPlayer.remove(id);
      return ok(null);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
