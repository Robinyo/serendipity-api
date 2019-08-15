import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Location {

  @PrimaryGeneratedColumn()
  readonly id: number;

}
