import {
  PrimaryGeneratedColumn,
  JoinColumn,
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
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
  landlordId: number; //explicitly visible in entity

}

