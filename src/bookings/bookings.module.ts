import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { OffersModule } from '../offers/offers.module';
import { PaymentsModule } from '../payments/payments.module';
@Module({
  imports: [TypeOrmModule.forFeature([Booking]), OffersModule, PaymentsModule],
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}