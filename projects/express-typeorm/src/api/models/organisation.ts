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

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
