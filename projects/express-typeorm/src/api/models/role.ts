import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Entity('Role')
export class Role {

  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({
    default: 'Member'
  })
  role: string;

  @Column()
  @IsNotEmpty()
  partyId: number;

  @Column()
  @IsNotEmpty()
  partyType: string;

  @Column()
  @IsNotEmpty()
  partyName: string;

  @Column({ nullable: true })
  partyEmail: string;

  @Column({ nullable: true })
  partyPhoneNumber: string;

  @Column({
    default: 'Membership'
  })
  relationship: string;

  @Column({
    default: 'Organisation'
  })
  reciprocalRole: string;

  @Column()
  @IsNotEmpty()
  reciprocalPartyId: number;

  @Column()
  @IsNotEmpty()
  reciprocalPartyType: string;

  @Column()
  @IsNotEmpty()
  reciprocalPartyName: string;

  @Column({ nullable: true })
  reciprocalPartyEmail: string;

  @Column({ nullable: true })
  reciprocalPartyPhoneNumber: string;

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md

// https://robferguson.org/blog/2017/08/18/parties-roles-and-relationships/

// https://robferguson.org/blog/2015/04/22/data-model-patterns/
