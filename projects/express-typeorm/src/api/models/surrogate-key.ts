import { PrimaryGeneratedColumn } from 'typeorm';

//
// A surrogate key is any column or set of columns that can be declared as the primary key instead of a "real" or
// natural key. Sometimes there can be several natural keys that could be declared as the primary key, and these
// are all called candidate keys. So a surrogate is a candidate key.
//

export class SurrogateKey {

  @PrimaryGeneratedColumn()
  readonly id: number;

  //
  // MongoDB
  // See: https://typeorm.io/#/mongodb
  //

  // @PrimaryGeneratedColumn('uuid')
  // readonly id: string;

}

// How To Use SurrogateKey
//
// import { SurrogateKey } from './surrogate-key';
//
// @Column(type => SurrogateKey, { prefix: '' })
// surrogateKey: SurrogateKey;
