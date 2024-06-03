import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Deck } from "./deck.entity";

@Entity()
export class Card {
  @Column({ primary: true })
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  colors: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  deck: Deck;
}
