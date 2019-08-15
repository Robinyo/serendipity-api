import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Type } from 'class-transformer';
// import { IsNotEmpty } from 'class-validator';

import { Address } from './address';
import { Role } from './role';
import { SpecialColumns } from './special-columns';

@Entity('Party')
export class Party {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column(type => SpecialColumns, { prefix: '' })
  specialColumns: SpecialColumns;

  @Column()
  partyType: string;

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
  // addresses: AddressCollection;
  addresses: Address[];

  @Type(() => Role)
  // @Type(() => RoleCollection)
  @ManyToMany(type => Role, {
    cascade: true,
  })
  @JoinTable({ name: 'PartyRole' })
  // roles: RoleCollection;
  roles: Role[];

}

// https://github.com/typestack/class-transformer

// https://github.com/typestack/class-transformer/issues/5 -> nested array

// Address[]
// export class AddressCollection extends Array<Address> {}
// Role[]
// export class RoleCollection extends Array<Role> {}

// @Type(() => AddressCollection)
