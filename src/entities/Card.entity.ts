import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Deck } from "./Deck.entity";

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
