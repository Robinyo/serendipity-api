import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Address } from './address';
import { Role } from './role';
import { SpecialColumns } from './special-columns';

@Entity('Party')
export class Party {

  @PrimaryGeneratedColumn()
  id: number;

  @Column(type => SpecialColumns, { prefix: '' })
  specialColumns: SpecialColumns;

  @IsNotEmpty()
  // @Column('varchar', { length: 50 })   // Type: VARCHAR(50)	Size: 2000000000,10
  @Column()
  partyType: string;

  @IsNotEmpty()
  // @Column('varchar', { length: 100 })  // Type: VARCHAR(100)	Size: 2000000000,10
  @Column()
  displayName: string;

  //
  // https://typeorm.io/#/many-to-many-relations
  //

  @Type(() => Address)
  @ManyToMany(type => Address, {
    cascade: true,
  })
  @JoinTable({ name: 'PartyAddress' })
  addresses: Address[];

  @Type(() => Role)
  @ManyToMany(type => Role, {
    cascade: true,
  })
  @JoinTable({ name: 'PartyRole' })
  roles: Role[];

}

// https://typeorm.io/#/entities

// https://github.com/typestack/class-transformer
