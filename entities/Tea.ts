import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  photoUrl: string;

  @Column()
  region: string;

  @Column({ default: 0 })
  numberOfLikes: number;

  @Column("text", { nullable: true })
  description: string;
}
