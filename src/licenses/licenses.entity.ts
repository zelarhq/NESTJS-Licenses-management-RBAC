import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licenseKey: string;

  @ManyToOne(() => User, (user) => user.licenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Exclude({ toPlainOnly: true }) // Exclude user from being serialized
  user: User;

  @Column({ type: 'date' })
  expiryDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
