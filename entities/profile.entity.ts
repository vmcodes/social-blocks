import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ default: null })
  did: string | null;

  @Column({ default: null })
  ipfsHash: string | null;

  @Column({ default: null })
  name: string | null;

  @Column({ default: null })
  location: string | null;

  @Column({ default: null })
  bio: string | null;

  @Column({ default: null })
  email: string | null;

  @Column({ default: null })
  website: string | null;

  @Column({ default: null })
  github: string | null;

  @Column({ default: null })
  twitter: string | null;

  @Column({ default: null })
  tiktok: string | null;

  @Column({ default: null })
  instagram: string | null;

  @Column({ default: null })
  facebook: string | null;

  @Column({ default: 'https://www.socialblocks.io' })
  qrcode: string;

  @Column({ default: new Date().toISOString() })
  createdAt: string;
}
