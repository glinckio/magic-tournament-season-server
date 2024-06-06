import { FindAllPlayers } from "../../../domain/usecases/find-all-players";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/http";

export class FindAllPlayersController implements Controller {
  constructor(private readonly findAllPlayers: FindAllPlayers) {}

  async handle(): Promise<HttpResponse> {
    try {
      const data = await this.findAllPlayers.findAll();
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
