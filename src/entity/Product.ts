import { Length, MinLength } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { Supplier } from "./Supplier";

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(2, {
    message: 'Nome muito curto, mínimo 2 caracteres',
  })
  name: string;

  suppliers: Supplier;

  @Column()
  @Length(10, 500, {
    message: 'Descrição muito curta, mínimo 10 caracteres',
  })
  description: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
