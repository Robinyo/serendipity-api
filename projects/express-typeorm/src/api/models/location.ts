import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

// import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { SpecialColumns } from './special-columns';

@Entity('Location')
export class Location {

  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @IsNotEmpty()
  @Column()
  type: string;  // 'Address' | ???

  @Column(type => SpecialColumns, { prefix: '' })
  specialColumns: SpecialColumns;

  constructor(
    type: string = 'Location'
  ) {
    this.type = type;
  }

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
