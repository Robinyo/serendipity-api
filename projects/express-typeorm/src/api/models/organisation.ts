import { Column, Entity } from 'typeorm';

import { Party } from './party';

@Entity('Organisation')
export class Organisation extends Party {

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

}
