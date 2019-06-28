import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { IsNotEmpty } from 'class-validator';

import { Address } from './address.entity';
import { Organisation } from './organisation.entity';

import { SurrogateKey } from './surrogate-key';

@Entity('Individual')
export class Individual extends SurrogateKey {

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

  @OneToOne(type => Organisation, {
    cascade: true,
  })
  @JoinColumn()
  organisation: Organisation;

  @OneToOne(type => Address, {
    cascade: true,
  })
  @JoinColumn()
  address: Address;

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
// https://typeorm.io/#/relations-faq
