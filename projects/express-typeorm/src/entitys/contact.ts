import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IsNotEmpty } from 'class-validator';

import { Organisation } from './organisation';

@Entity('Contact')
export class Contact {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  title: string;

  @Column()
  @IsNotEmpty()
  givenName: string;

  @Column()
  middleName: string;     // otherNames

  @Column()
  @IsNotEmpty()
  familyName: string;

  @Column()
  honorific: string;

  @Column()
  salutation: string;     // formalSalutation

  @Column()
  preferredName: string;  // informalSalutation

  @Column()
  initials: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  photoUrl: string;

  @OneToOne(type => Organisation, {
    cascade: true,
  })
  @JoinColumn()
  organisation: Organisation;

}

/*

  // @PrimaryColumn()

  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // @VersionColumn

  // https://typeorm.io/#/relations-faq

*/
