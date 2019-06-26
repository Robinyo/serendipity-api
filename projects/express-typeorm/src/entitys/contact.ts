import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Contact')
export class Contact {

  // @PrimaryColumn()

  // @PrimaryGeneratedColumn('uuid')
  // id: string;

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


  // @CreateDateColumn
  // @UpdateDateColumn
  // @VersionColumn

  // https://typeorm.io/#/relations-faq

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
