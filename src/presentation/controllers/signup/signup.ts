import { AddPlayer } from "../../../domain/usecases/add-player";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { serverError, ok, badRequest } from "../../helpers/http/http-helper";
import { Validation } from "../../protocols/validation";
import { Controller } from "../../protocols/controller";

export class SignUpController implements Controller {
  constructor(
    private readonly addPlayer: AddPlayer,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { name, cpf, email, password } = httpRequest.body;
      const data = await this.addPlayer.add({
        name,
        email,
        password,
        cpf,
      });
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
