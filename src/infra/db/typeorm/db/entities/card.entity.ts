import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Deck } from "./deck.entity";

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  deck: Deck;
}
