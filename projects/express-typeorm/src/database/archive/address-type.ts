import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { Type } from './type';

@Entity('AddressType')
export class AddressType {

  @PrimaryGeneratedColumn()
  id: string;

  //
  // https://typeorm.io/#/embedded-entities/
  //

  // @Column(type => Type, { prefix: '' })
  // type: Type;

  @Column()
  name: string;

  @Column()
  description: string;

}

/*

//
// https://typeorm.io/#/entity-inheritance
//

@Entity('AddressType')
export class AddressType extends Type {

  @PrimaryGeneratedColumn()
  id: string;

}

*/
