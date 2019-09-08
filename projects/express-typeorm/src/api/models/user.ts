import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

import * as bcrypt from 'bcrypt';

// import { Type } from 'class-transformer';
import { Length, IsNotEmpty } from 'class-validator';

import { SpecialColumns } from './special-columns';

@Entity('User')
@Unique(['username'])
export class User {

  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  @Length(4, 50)
  username: string;

  @Column()
  @Length(4, 50)
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  @IsNotEmpty()
  givenName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  @IsNotEmpty()
  familyName: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  preferredUsername: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column({
    default: false
  })
  emailVerified: boolean;

  @Column(type => SpecialColumns, { prefix: '' })
  specialColumns: SpecialColumns;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

}

// https://github.com/andregardi/jwt-express-typeorm/blob/master/src/entity/User.ts

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md

/*

  @Column({
    default: 'User'
  })
  role: string;

*/

/*

export interface User {

  sub?: string;

  // profile: name, family_name, given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate,
  // zoneinfo, locale, and updated_at.
  name?: string;
  givenName?: string;
  middleName?: string;
  familyName?: string;
  nickname?: string;
  preferredUsername?: string;
  profile?: string;
  picture?: string;
  website?: string;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  updatedAt?: string;

  // email: email and email_verified.
  email?: string;
  emailVerified?: boolean;

  // address: address
  address?: object;

  // phone: phone_number and phone_number_verified.
  phoneNumber?: string;
  phoneNumberVerified?: boolean;

  // TODO -> See: collection.service.ts

  username?: string;
  password?: string;

}

*/

