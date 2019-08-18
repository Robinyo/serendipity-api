import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Location {

  @PrimaryGeneratedColumn()
  id: number;

}
