import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Party } from './party';

@Entity('Organisation')
export class Organisation {

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
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  phoneNumber: string;

}

// https://en.wikipedia.org/wiki/List_of_political_parties_in_Australia
