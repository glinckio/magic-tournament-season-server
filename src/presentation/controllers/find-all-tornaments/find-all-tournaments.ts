import { FindAllTournaments } from "../../../domain/usecases/find-all-tournaments";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpResponse } from "../../protocols/http";

export class FindAllTournamentsController implements Controller {
  constructor(private readonly findAllTournaments: FindAllTournaments) {}

  async handle(): Promise<HttpResponse> {
    try {
      const data = await this.findAllTournaments.findAll();
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
