import { Authentication } from "../../../domain/usecases/authentication";
import { DataNotFound } from "../../errors/data-not-found";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { Validation } from "../../protocols/validation";

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({ email, password });
      if (accessToken === null) {
        return badRequest(new DataNotFound("Player"));
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
