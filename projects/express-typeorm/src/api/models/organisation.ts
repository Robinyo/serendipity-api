import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Organisation')
export class Organisation {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

}

// import { SurrogateKey } from './surrogate-key';
// export class Organisation extends SurrogateKey {
