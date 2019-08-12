import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AddressType } from './address-type';
import { Location } from './location';

@Entity('Address')
export class Address extends Location {

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column({
    default: 'Australia'
  })
  country: string;

  @OneToOne(type => AddressType, {
    cascade: true,
  })
  @JoinColumn()
  addressType: AddressType;

}

// https://github.com/typeorm/typeorm/blob/master/docs/entities.md

// Error: OneToOne FOREIGN KEY constraint
