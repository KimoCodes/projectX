import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  taskId: string;

  @Column()
  taskerId: string;

  @Column({ type: 'integer' })
  amount: number; // cents

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';
}