import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor() {
    const key = process.env.STRIPE_SECRET_KEY || '';
    this.stripe = new Stripe(key, { apiVersion: '2022-11-15' });
  }
  async createPaymentIntent(amount: number, currency = 'usd', opts: any = {}) {
    const intent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      ...opts
    });
    return intent;
  }
  verifyWebhookSignature(rawBody: Buffer | string, signature: string, secret: string) {
    if (!secret) throw new Error('Webhook secret not configured');
    return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
  }
  async createTransfer(amount: number, destinationAccount: string, currency = 'usd') {
    // destinationAccount is the connected account ID
    return this.stripe.transfers.create({
      amount,
      currency,
      destination: destinationAccount
    });
  }
}