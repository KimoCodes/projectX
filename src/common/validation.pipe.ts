import { ValidationPipe } from '@nestjs/common';
export const AppValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: false,
  transform: true
});