import { Column } from 'typeorm';

//
// https://typeorm.io/#/embedded-entities/
//

export class Type {

  @Column()
  name: string;

  @Column()
  description: string;

}

/*

//
// https://typeorm.io/#/entity-inheritance
//

export abstract class Type {

  @Column()
  name: string;

  @Column()
  description: string;

}

*/
