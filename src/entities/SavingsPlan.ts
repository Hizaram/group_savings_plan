// src/entities/SavingsPlan.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class SavingsPlan {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  description: string = "";

  @Column()
  targetAmount: string = "";

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_created: Date = new Date();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_updated: Date = new Date();

  @ManyToOne(() => User, user => user.savingsPlans)
    @JoinColumn({ name: 'user_id' })
    user: User | null = new User();
}