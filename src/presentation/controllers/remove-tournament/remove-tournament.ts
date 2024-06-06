import { RemoveTournament } from "../../../domain/usecases/remove-tournament";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class RemoveTournamentController implements Controller {
  constructor(private readonly removeTournament: RemoveTournament) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.removeTournament.remove(id);
      return ok(null);
    } catch (error) {
      return serverError(error);
    }
  }
}
