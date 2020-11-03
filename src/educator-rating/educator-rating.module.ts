import { Module } from '@nestjs/common';
import { EducatorRatingController } from './educator-rating.controller';
import { EducatorRatingService } from './educator-rating.service'
import { Rating } from './interfaces/rating.interface'
import { RatingSchema } from './schemas/rating.schema';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{name: "Rating", schema: RatingSchema}])],
  providers: [EducatorRatingService],
  controllers: [EducatorRatingController],
  exports: [MongooseModule.forFeature([{name: "Rating", schema: RatingSchema}])]
})
export class EducatorRatingModule {}
