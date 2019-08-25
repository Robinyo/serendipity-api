import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

// import { Type } from 'class-transformer';
// import { IsNotEmpty } from 'class-validator';

export class SpecialColumns {

  @CreateDateColumn()
  createdAt: Date;

  // @Column()
  // createdBy: string

  @UpdateDateColumn()
  updatedAt: Date;

  // @Column()
  // updatedBy: string

  @VersionColumn()
  version: number;

  // rowTimeStamp:

}

// https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md
// https://typeorm.io/#/decorator-reference/column-decorators

/*

// https://github.com/typeorm/typeorm/issues/400 -> Update/Create DateColumn as Unix Timestamp

// https://www.postgresql.org/docs/9.1/datatype-datetime.html -> timestamptz is accepted as an abbreviation for
   timestamp with time zone

I also have the same problem, in my case I'd like to get an ISO8601 string instead of Date for a timestamptz column,
e.g.:

@CreateDateColumn({ type: "timestamptz" })
public createdAt?: string;
UPDATE:
I solved this with a transformer:

@CreateDateColumn({
  type: "timestamptz",
  transformer: {
    from: (value?: Date | null) =>
        value === undefined || value === null ? value : value.toISOString(),
    to: (value?: string | null) =>
        value === undefined || value === null ? value : new Date(value)
  }
})
public createdAt?: IsoDate;
This is a bit cumbersome though, also I'm not sure of the performance overhead in using a transformer vs something
that could be provided natively by typeorm.

--

import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { Type } from 'class-transformer';

export class BaseEntity {
  @Column({
    type: 'int',
    width: 11,
    nullable: false,
    readonly: true,
    default: () => '0',
    transformer: {
      to: (value?: Date) => (!value ? value : Math.round(value.getTime() / 1000)),
      from: (value?: number) => (!value ? value : new Date(value * 1000))
    }
  })
  @Type(() => Date)
  createdAt: Date;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    default: () => null,
    transformer: {
      to: (value?: Date) => (!value ? value : Math.round(value.getTime() / 1000)),
      from: (value?: number) => (!value ? value : new Date(value * 1000))
    }
  })
  @Type(() => Date)
  updatedAt?: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }
}

*/
