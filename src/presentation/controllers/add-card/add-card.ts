import { HttpRequest, HttpResponse } from "../../protocols/http";
import { serverError, ok, badRequest } from "../../helpers/http/http-helper";
import { AddCard } from "../../../domain/usecases/add-card";
import { Validation } from "../../protocols/validation";

export class AddCardController {
  constructor(
    private readonly addCard: AddCard,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { cardId, name, image, colors, deck } = httpRequest.body;
      const data = await this.addCard.add({
        cardId,
        name,
        image,
        colors,
        deck,
      });
      return ok(data);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
