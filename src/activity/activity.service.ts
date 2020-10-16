import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from './interfaces/activity.interface'
import { CreateUpdateActivityDto } from './dto/createupdate-activity.dto';

@Injectable()
export class ActivityService {
    constructor(@InjectModel('Activity') private readonly activityModel: Model<Activity>) {}
    async findAll() : Promise<Activity[]> {
        return this.activityModel.find();
    }

    async findOne(id: string): Promise<Activity> {
        return this.activityModel.findOne({_id: id});
    }

    async create(createActivityDto: CreateUpdateActivityDto): Promise<Activity> {
        const createdActivity = new this.activityModel(createActivityDto)
        return createdActivity.save();
      }
}
