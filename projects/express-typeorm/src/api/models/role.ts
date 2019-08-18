import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { SpecialColumns } from './special-columns';
// import { SurrogateKey } from './surrogate-key';

@Entity('Role')
export class Role {

  // @Column(type => SurrogateKey, { prefix: '' })
  // surrogateKey: SurrogateKey;

  @PrimaryGeneratedColumn()
  // readonly id: number;
  id: number;

  @Column({
    default: 'Member'
  })
  role: string;

  @Column()
  partyId: number;

  @Column()
  partyType: string;

  @Column()
  partyName: string;

  @Column({
    default: 'Membership'
  })
  relationship: string;

  @Column({
    default: 'Organisation'
  })
  reciprocalRole: string;

  @Column()
  reciprocalPartyId: number;

  @Column()
  reciprocalPartyType: string;

  @Column()
  reciprocalPartyName: string;

}

// https://robferguson.org/blog/2017/08/18/parties-roles-and-relationships/

// https://robferguson.org/blog/2015/04/22/data-model-patterns/
