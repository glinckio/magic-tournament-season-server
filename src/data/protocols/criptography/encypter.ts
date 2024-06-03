import { Player } from "../../../infra/db/typeorm/db/entities/player.entity";

export interface Encypter {
  encrypt(value: Player): Promise<string>;
  verify(token: string): Promise<{ decoded: Player; error: string }>;
}
