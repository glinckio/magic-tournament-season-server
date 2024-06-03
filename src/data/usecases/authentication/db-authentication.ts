import {
  Authentication,
  AuthenticationModel,
} from "../../../domain/usecases/authentication";
import { PlayerTypeOrmRepository } from "../../../infra/db/typeorm/player-repository/player";
import { Encypter } from "../../protocols/criptography/encypter";
import { HashComparer } from "../../protocols/criptography/hash-comparer";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly playerOrmRepository: PlayerTypeOrmRepository,
    private readonly hashComparer: HashComparer,
    private readonly encypter: Encypter
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const player = await this.playerOrmRepository.findByEmail(
      authentication.email
    );
    if (player) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        player.password
      );
      if (isValid) {
        const accessToken = await this.encypter.encrypt(player);
        return accessToken;
      }
    }
    return null;
  }
}
