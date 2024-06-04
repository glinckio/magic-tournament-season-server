import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Deck } from "./deck-entity";
import { Tournament } from "./tournament-entity";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Deck, { cascade: true, eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  deck: Deck;

  @OneToMany(() => Deck, (tournament) => tournament.player, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  tournament: Tournament[];
}
