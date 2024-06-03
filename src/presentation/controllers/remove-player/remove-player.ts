import { RemovePlayer } from "../../../domain/usecases/remove-player";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class RemovePlayerController {
  constructor(private readonly removePlayer: RemovePlayer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.removePlayer.remove(id);
      return ok(null);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
