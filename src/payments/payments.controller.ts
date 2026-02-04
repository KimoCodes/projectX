import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';
@Controller('payments')
export class PaymentsController {
  constructor(private stripe: StripeService) {}
  @Post('create-intent')
  async createIntent(@Body() body: any) {
    const { amount, currency = 'usd', metadata } = body;
    return this.stripe.createPaymentIntent(amount, currency, { metadata });
  }
  @Post('webhook')
  async webhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
    // NOTE: For proper verification, configure express.raw middleware for this route so rawBody is available.
    const raw = (req as any).rawBody || JSON.stringify(req.body);
    try {
      const event = this.stripe.verifyWebhookSignature(raw, signature, process.env.STRIPE_WEBHOOK_SECRET || '');
      if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent;
        // handle successful payment: find booking by metadata.bookingId and mark as paid
        return { received: true };
      }
      return { received: true };
    } catch (err) {
      return { error: 'Webhook signature verification failed' };
    }
  }
}