//src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SavingsPlan } from "./SavingsPlan";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  username: string = "";

  @Column()
  password: string = "";

  @Column()
  email: string = "";

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_created: Date = new Date();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_updated: Date = new Date();

  @OneToMany(() => SavingsPlan, savingsPlan => savingsPlan.user)
  savingsPlans!: SavingsPlan[];
}