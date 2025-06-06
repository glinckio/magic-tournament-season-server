import { UpdatePlayer } from "../../../domain/usecases/update-player";
import { badRequest, ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class UpdatePlayerController implements Controller {
  constructor(
    private readonly updatePlayer: UpdatePlayer,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { id, name, cpf, email, role } = httpRequest.body;
      const data = await this.updatePlayer.update({
        id,
        name,
        email,
        cpf,
        role,
      });
      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
