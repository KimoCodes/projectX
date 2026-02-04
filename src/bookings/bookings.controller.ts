import { Body, Controller, Post, UseGuards, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('bookings')
export class BookingsController {
  constructor(private bookings: BookingsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any, @Param() params: any) {
    const { offerId } = body;
    // clientId would come from JWT in a real guard; here expect it in body for simplicity
    const clientId = body.clientId;
    return this.bookings.createFromOffer(offerId, clientId);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/complete')
  async complete(@Param('id') id: string) {
    return this.bookings.markCompleted(id);
  }
}