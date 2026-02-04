import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  taskId: string;
  @Column()
  clientId: string;
  @Column()
  taskerId: string;
  @Column()
  offerId: string;
  @Column({ type: 'integer' })
  totalAmount: number; // cents
  @Column({ type: 'numeric', default: 0 })
  platformFeePct: number;
  @Column({ default: 'pending_payment' })
  status: string;
  @Column({ nullable: true })
  stripePaymentIntentId: string;
  @CreateDateColumn()
  createdAt: Date;
}