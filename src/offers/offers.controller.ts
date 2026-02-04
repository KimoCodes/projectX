import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOfferDto } from './dto/create-offer.dto';
@Controller('tasks/:taskId/offers')
export class OffersController {
  constructor(private offers: OffersService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Param('taskId') taskId: string, @Body() body: CreateOfferDto) {
    return this.offers.createForTask(taskId, body as any);
  }
  @Get()
  async list(@Param('taskId') taskId: string) {
    return this.offers.findByTask(taskId);
  }
}