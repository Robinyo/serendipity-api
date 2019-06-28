import { Column, Entity } from 'typeorm';

import { SurrogateKey } from './surrogate-key';

@Entity('Address')
export class Address extends SurrogateKey {

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

  // @Column()
  // country: string;

}
