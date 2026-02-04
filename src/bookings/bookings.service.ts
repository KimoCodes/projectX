import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { OffersService } from '../offers/offers.service';
import { StripeService } from '../payments/stripe.service';
@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private offers: OffersService,
    private stripe: StripeService
  ) {}
  async createFromOffer(offerId: string, clientId: string) {
    const offer = await this.offers.findById(offerId);
    if (!offer) throw new Error('Offer not found');
    const booking = this.repo.create({
      taskId: offer.taskId,
      clientId,
      taskerId: offer.taskerId,
      offerId: offer.id,
      totalAmount: offer.amount,
      platformFeePct: 15,
      status: 'pending_payment'
    });
    const saved = await this.repo.save(booking);
    // create Stripe PaymentIntent (hold funds)
    const intent = await this.stripe.createPaymentIntent(saved.totalAmount, 'usd', {
      metadata: { bookingId: saved.id }
    });
    saved.stripePaymentIntentId = intent.id;
    await this.repo.save(saved);
    return { booking: saved, paymentIntent: intent };
  }
  async markCompleted(id: string) {
    const b = await this.repo.findOne({ where: { id } });
    if (!b) throw new Error('Booking not found');
    b.status = 'completed';
    return this.repo.save(b);
  }
}