import { MinLength } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(5, {
    message: 'Muito curto, mínimo 5 caracteres',
  })
  username: string;

  @Column({ select: false })
  @MinLength(8, {
    message: 'Senha muito curta, mínimo 8 caracteres',
  })
  password: string;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}