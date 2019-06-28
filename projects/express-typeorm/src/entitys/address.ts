import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { SurrogateKey } from './surrogate-key';
// export class Address extends SurrogateKey {

@Entity('Address')
export class Address {

  @PrimaryGeneratedColumn()
  id: number;

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
