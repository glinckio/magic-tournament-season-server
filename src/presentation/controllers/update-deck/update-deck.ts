import { UpdateDeck } from "../../../domain/usecases/update-deck";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class UpdateDeckController {
  constructor(
    private readonly updateDeck: UpdateDeck,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { id, title, player } = httpRequest.body;
      const data = await this.updateDeck.update({ id, title, player });
      return ok(data);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
