import { IsInt, IsOptional, IsString, Min } from 'class-validator';
export class CreateOfferDto {
  @IsInt()
  @Min(0)
  amount: number;
  @IsOptional()
  @IsString()
  message?: string;
}