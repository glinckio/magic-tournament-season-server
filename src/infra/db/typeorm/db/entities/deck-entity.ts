import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Card } from "./card-entity";
import { Player } from "./player-entity";

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  title: string;

  @OneToMany(() => Card, (card) => card.deck, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  cards: Card[];

  @OneToOne(() => Player, { onDelete: "CASCADE" })
  @JoinColumn()
  player: Player;
}
