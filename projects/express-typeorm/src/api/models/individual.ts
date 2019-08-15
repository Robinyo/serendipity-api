import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Party } from './party';

@Entity('Individual')
export class Individual {

  @PrimaryColumn()
  id: number;

  // @BeforeInsert()
  // setPrimaryKey() {
  //   this.id = this.party.id;
  // }

  //
  // https://typeorm.io/#/one-to-one-relations
  //

  @Type(() => Party)
  @OneToOne(type => Party, {
    cascade: true,
  })
  @JoinColumn({ name: 'partyId' })
  party: Party;

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

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
// https://typeorm.io/#/relations-faq
// https://typeorm.io/#/many-to-one-one-to-many-relations

/*

  //
  // https://typeorm.io/#/many-to-many-relations
  //

  @Type(() => Organisation)
  @ManyToMany(type => Organisation, {
    cascade: true,
  })
  @JoinTable({ name: 'IndividualOrganisation' })
  organisations: Organisation[];

  @Type(() => Organisation)
  @OneToOne(type => Organisation, {
    cascade: true,
  })
  @JoinColumn()
  organisation: Organisation;

*/

/*

  //
  // https://typeorm.io/#/embedded-entities/
  //

  @Column(type => SurrogateKey, { prefix: '' })
  surrogateKey: SurrogateKey;

*/

/*

  @PrimaryColumn({
    default: () => setPrimaryKey()
  })
  id: number;

  // @BeforeInsert()
  setPrimaryKey() {
    this.id = this.party.id;
  }

*/

// export class Individual extends Party {

// https://github.com/typeorm/typeorm/issues/150

/*

  // @PrimaryColumn('varchar', { length: <max shortId length>, default: () => `'${shortid.generate()}'` })
  // @Column({ default: () => "pow(5)" })

  @PrimaryColumn({
    default: () => 'party.id'
  })
  id: number;

*/
