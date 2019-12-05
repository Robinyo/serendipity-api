import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Party } from './party';

@Entity('Organisation')
export class Organisation {

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

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  constructor(name: string,
              phoneNumber: string = '') {

    this.party = new Party('Organisation', name);

    this.name = name;
    this.phoneNumber = phoneNumber;
  }

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md

/*

  // https://github.com/typeorm/typeorm/issues/3903

  constructor(params: {name: string, phoneNumber: string}) {

    this.party = new Party('Organisation', params.name);

    this.name = params.name;
    this.phoneNumber = params.phoneNumber;
  }

  constructor() {}

  constructor(name: string,
              phoneNumber: string = '') {

    this.party = new Party('Organisation', name);

    this.name = name;
    this.phoneNumber = phoneNumber;
  }

*/
