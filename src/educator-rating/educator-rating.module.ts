import { Module } from '@nestjs/common';
import { EducatorRatingController } from './educator-rating.controller';

@Module({
  controllers: [EducatorRatingController]
})
export class EducatorRatingModule {}
