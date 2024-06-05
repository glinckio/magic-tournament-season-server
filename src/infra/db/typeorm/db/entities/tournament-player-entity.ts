import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player-entity";
import { Tournament } from "./tournament-entity";

@Entity()
export class TournamentPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Player, (player) => player.id)
  @JoinColumn()
  player: Player;

  @OneToOne(() => Tournament, (tournament) => tournament.id)
  @JoinColumn()
  tournament: Tournament;
}
