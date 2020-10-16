import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivitySchema } from './schemas/activity.schema';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{name: "Activity", schema: ActivitySchema}])],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}