import { IsPhoneNumber, IsPostalCode, MinLength, Validate } from "class-validator";
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, BaseEntity, JoinTable } from "typeorm";
import { Product } from "./Product";
import { CustomCNPJchecker } from "./components/cnpjValidator";

@Entity('suppliers')
export class Supplier extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Validate(CustomCNPJchecker)
  cnpj: string;

  @Column()
  @MinLength(2, {
    message: 'Nome muito curto, mínimo 2 caracteres',
  })
  name: string;

  @Column()
  @IsPhoneNumber('BR')
  phone: string;

  @Column()
  @IsPostalCode('BR', {
    message: 'CEP deve estar no formato XXXXX-XXX',
  })
  zipcode: string;

  @ManyToMany(() => Product, suppliers => Supplier)
  @JoinTable()
  products: Product;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_At' })
  updatedAt: Date;
}
