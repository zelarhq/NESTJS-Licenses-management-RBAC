// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { User } from '../users/user.entity';

// @Entity()
// export class License {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   licenseKey: string;

//   @ManyToOne(() => User, (user) => user.licenses)
//   user: User;

//   @Column({ type: 'date' })
//   expiryDate: Date;

//   @Column({ default: true })
//   isActive: boolean;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licenseKey: string;

  @ManyToOne(() => User, (user) => user.licenses)
  user: User;

  @Column({ type: 'date' })
  expiryDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
