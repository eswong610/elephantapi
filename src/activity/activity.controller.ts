import { Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { CreateUpdateActivityDto } from './dto/createupdate-activity.dto';
import { ActivityService } from './activity.service';
import { Activity } from './interfaces/activity.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('activity')
@UseGuards(JwtAuthGuard)
export class ActivityController {

    constructor(private readonly activityService: ActivityService) {}

    @Get('all')
    async getAll(): Promise<Activity[]>{
        return this.activityService.findAll();
    }
    

    @Get(':id')
    async getOne(@Param() param): Promise<Activity>{
        return this.activityService.findOne(param.id);
    }

    @Get('educator/:id')
    async getAllByEducator(@Param() param): Promise<Activity[]>{
        return this.activityService.findByEducator(param.id);
    }

    // @Post("create")
    // createUpdate(@Body() createUpdateActivityDto :CreateUpdateActivityDto) : string{
    //     return (`this is from the body ${createUpdateActivityDto.name}`)
    // }

    @Post("create")
    async create(@Body() createUpdateActivityDto: CreateUpdateActivityDto) : Promise<Activity>{
        return this.activityService.create(createUpdateActivityDto);
    }

    @Delete(':id')
    delete(@Param() param) : string {
        return `deleted ${param.id}`
    }
}
