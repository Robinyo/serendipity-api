import { Column, Entity } from 'typeorm';

import { SurrogateKey } from './surrogate-key';

@Entity('Organisation')
export class Organisation extends SurrogateKey {

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

}
