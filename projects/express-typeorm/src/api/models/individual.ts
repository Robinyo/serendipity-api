import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Party } from './party';

@Entity('Individual')
export class Individual {

  get id(): number {
    return this.party.id;
  }

  @Type(() => Party)
  @OneToOne(type => Party, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
    nullable: false
  })
  @JoinColumn({ name: 'partyId' })
  @Index()
  party: Party;

  @Column({ nullable: true })
  title: string;

  @Column()
  @IsNotEmpty()
  givenName: string;

  @Column({ nullable: true })
  middleName: string;            // otherNames

  @Column()
  @IsNotEmpty()
  familyName: string;

  @Column({ nullable: true })
  honorific: string;

  @Column({ nullable: true })
  salutation: string;            // formalSalutation

  @Column({ nullable: true })
  preferredName: string;         // informalSalutation

  @Column({ nullable: true })
  initials: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  placeOfBirth: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  photoUrl: string;

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md

