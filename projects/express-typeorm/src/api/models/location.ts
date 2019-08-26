import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

// import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Entity('Location')
export class Location {

  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @IsNotEmpty()
  @Column()
  type: string;

  constructor(
    type: string = 'Location'
  ) {
    this.type = type;
  }

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
