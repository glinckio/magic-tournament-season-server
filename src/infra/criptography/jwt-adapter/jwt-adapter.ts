import jwt from "jsonwebtoken";
import { Encypter } from "../../../data/protocols/criptography/encypter";
import { Player } from "../../db/typeorm/db/entities/player-entity";

export class JwtAdapter implements Encypter {
  constructor(private readonly secret: string) {}

  async encrypt(player: Player): Promise<string> {
    const accessToken = await jwt.sign(JSON.stringify(player), this.secret);
    return accessToken;
  }

  async verify(token: string): Promise<{ decoded: Player; error: string }> {
    let player: Player;
    let error: string;
    await jwt.verify(token, this.secret, (err, decoded) => {
      if (err) {
        return (error = err);
      }
      player = decoded;
    });
    return { decoded: player, error };
  }
}
