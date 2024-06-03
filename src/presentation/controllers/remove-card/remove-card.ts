import { HttpRequest, HttpResponse } from "../../protocols/http";
import { serverError, ok, badRequest } from "../../helpers/http/http-helper";
import { RemoveCard } from "../../../domain/usecases/remove-card";

export class RemoveCardController {
  constructor(private readonly removeCard: RemoveCard) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.removeCard.remove(id);
      return ok(null);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
