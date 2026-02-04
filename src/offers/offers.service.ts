import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private repo: Repository<Offer>) {}
  async createForTask(taskId: string, data: Partial<Offer>) {
    const offer = this.repo.create({ ...data, taskId });
    return this.repo.save(offer);
  }
  async findByTask(taskId: string) {
    return this.repo.find({ where: { taskId } });
  }
  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}