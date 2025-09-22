import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  userId: number;
}

