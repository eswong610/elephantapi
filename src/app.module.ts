import * as dotenv from 'dotenv'
dotenv.config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { BookingService } from './booking/booking.service';
import { EducatorRatingService } from './educator-rating/educator-rating.service';
// import { EducatorRatingModule } from './educator-rating/educator-rating.module';
import {EducatorRatingModule } from './educator-rating/educator-rating.module'
import { BookingModule } from './booking/booking.module';





@Module({
  imports: [ActivityModule, MongooseModule.forRoot(process.env.MONGO_URI), AuthModule, UserModule, CategoryModule, EducatorRatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
