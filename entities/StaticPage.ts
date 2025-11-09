import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StaticPage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @Column()
  type!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;
}
