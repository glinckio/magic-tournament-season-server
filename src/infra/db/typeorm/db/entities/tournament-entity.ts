import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  startsAt: string;
}
