import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Party } from './party';

import { Address } from './address';
import { Organisation } from './organisation';

@Entity('Individual')
export class Individual extends Party {

  @Column()
  displayName: string;

  @Column()
  title: string;

  @Column()
  @IsNotEmpty()
  givenName: string;

  @Column()
  middleName: string;     // otherNames

  @Column()
  @IsNotEmpty()
  familyName: string;

  @Column()
  honorific: string;

  @Column()
  salutation: string;     // formalSalutation

  @Column()
  preferredName: string;  // informalSalutation

  @Column()
  initials: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  photoUrl: string;

  //
  // https://typeorm.io/#/one-to-one-relations
  //

  @Type(() => Organisation)
  @OneToOne(type => Organisation, {
    cascade: true,
  })
  @JoinColumn()
  organisation: Organisation;

  //
  // https://typeorm.io/#/many-to-many-relations
  //

  @ManyToMany(type => Address, {
    cascade: true,
  })
  @JoinTable({name: 'IndividualAddress'})
  addresses: Address[];

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
// https://typeorm.io/#/relations-faq
// https://typeorm.io/#/many-to-one-one-to-many-relations

/*

  @Type(() => Address)
  @OneToOne(type => Address, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

*/
