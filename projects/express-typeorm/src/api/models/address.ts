import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Location } from './location';

@Entity('Address')
export class Address {

  @Type(() => Location)
  @OneToOne(type => Location, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
    nullable: false
  })
  @JoinColumn({ name: 'id' })
  @Index()
  location: Location;

  @Column()
  @IsNotEmpty()
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column()
  @IsNotEmpty()
  city: string;

  @Column()
  @IsNotEmpty()
  state: string;

  @Column()
  @IsNotEmpty()
  postalCode: string;

  @Column({
    default: 'Australia'
  })
  country: string;

  @Column()
  @IsNotEmpty()
  addressType: string;

  constructor(
      line1: string = '',
      line2: string = '',
      city: string = '',
      state: string = '',
      postalCode: string = '',
      country: string = '',
      addressType: string = ''
  ) {

    this.location = new Location('Address');

    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.addressType = addressType;

  }

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md

// get id(): number {
//   return this.location.id;
// }
//
// @JoinColumn({ name: 'locationId' })
