import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // Just role, not a relation
  @Column({ type: 'enum', enum: ['LANDLORD', 'TENANT'] })
  role: 'LANDLORD' | 'TENANT' | 'COMPANY';

}
