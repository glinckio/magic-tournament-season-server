import { AddTournament } from "../../../domain/usecases/add-tournament";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class AddTournamentController implements Controller {
  constructor(
    private readonly addTournament: AddTournament,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { name, startsAt } = httpRequest.body;
      const data = await this.addTournament.add({
        name,
        startsAt,
      });
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
