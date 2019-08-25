import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Address } from './address';
import { Role } from './role';
import { SpecialColumns } from './special-columns';

@Entity('Party')
export class Party {

  @PrimaryGeneratedColumn()
  // readonly id: number;
  id: number;

  @Column(type => SpecialColumns, { prefix: '' })
  specialColumns: SpecialColumns;

  @IsNotEmpty()
  @Column()
  partyType: string;

  @IsNotEmpty()
  @Column()
  displayName: string;

  @Type(() => Address)
  @ManyToMany(type => Address, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({ name: 'PartyAddress' })
  addresses: Address[];

  @Type(() => Role)
  @ManyToMany(type => Role, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinTable({ name: 'PartyRole' })
  roles: Role[];

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
