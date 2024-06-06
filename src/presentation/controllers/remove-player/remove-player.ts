import { RemovePlayer } from "../../../domain/usecases/remove-player";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class RemovePlayerController implements Controller {
  constructor(private readonly removePlayer: RemovePlayer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.removePlayer.remove(id);
      return ok(null);
    } catch (error) {
      return serverError(error);
    }
  }
}
