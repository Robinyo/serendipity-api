import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column()
  title: string;

  @Column()
  givenName?: string;

  @Column()
  middleName?: string;     // otherNames

  @Column()
  familyName?: string;

  @Column()
  honorific?: string;

  @Column()
  salutation?: string;     // formalSalutation

  @Column()
  preferredName?: string;  // informalSalutation

  @Column()
  initials?: string;

  @Column()
  gender?: string;

  @Column()
  email?: string;

  @Column()
  phoneNumber?: string;

  @Column()
  photoUrl?: string;

}

/*

  'organisation': {
    id?: string;
    name?: string;
    phoneNumber?: string;
  };

  'address': {
    id?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    // country?: string;
  };

*/
