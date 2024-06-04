import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Player } from "./player-entity";

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  startsAt: string;

  @ManyToOne(() => Player, (player) => player.tournament)
  @JoinColumn()
  players: Player;
}
