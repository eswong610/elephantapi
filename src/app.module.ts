import * as dotenv from 'dotenv'
dotenv.config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ActivityController } from './activity/activity.controller';
// import { ActivityService } from './activity/activity.service';
import { ActivityModule } from './activity/activity.module';


@Module({
  imports: [ActivityModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
