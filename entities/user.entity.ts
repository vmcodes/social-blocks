import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ default: null })
  address: string | null;

  @Column({ default: new Date().toISOString() })
  createdAt: string;
}
