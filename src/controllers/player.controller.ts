import { Request } from "express";
import { PlayerRepository } from "../repositories/player.repository";

export class SignUpController {
  constructor(private playerRepository: PlayerRepository) {}

  async handle(httpRequest: Request) {
    try {
      const body = httpRequest.body;
      const data = await this.playerRepository.signup(body);

      return {
        statusCode: 200,
        body: data,
      };
    } catch (error) {
      return {
        statusCode: 400,
        error: "Error",
      };
    }
  }
}
