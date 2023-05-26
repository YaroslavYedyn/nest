import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: boolean;

  @Column('text')
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  lastName: string;

  @Column('varchar')
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  activation_key: string;
}
