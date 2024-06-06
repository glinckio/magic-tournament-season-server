import { HttpRequest, HttpResponse } from "../../protocols/http";
import { serverError, ok } from "../../helpers/http/http-helper";
import { RemoveCard } from "../../../domain/usecases/remove-card";
import { Controller } from "../../protocols/controller";

export class RemoveCardController implements Controller {
  constructor(private readonly removeCard: RemoveCard) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.removeCard.remove(id);
      return ok(null);
    } catch (error) {
      return serverError(error);
    }
  }
}
