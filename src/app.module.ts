import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PaymentsModule } from './payments/payments.module';
import { OffersModule } from './offers/offers.module';
import { BookingsModule } from './bookings/bookings.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    TasksModule,
    PaymentsModule,
    OffersModule,
    BookingsModule
  ]
})
export class AppModule {}