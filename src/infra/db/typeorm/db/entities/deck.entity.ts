import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Card } from "./card.entity";

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Card[];
}
