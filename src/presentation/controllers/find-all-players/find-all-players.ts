import { FindAllPlayers } from "../../../domain/usecases/find-all-players";
import { ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class FindAllPlayersController {
  constructor(private readonly findAllPlayers: FindAllPlayers) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = await this.findAllPlayers.findAll();
      return ok(data);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
