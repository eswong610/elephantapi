import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put} from '@nestjs/common';
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
    
    @Get('category/:id')
    async getActivitiesByCategory(@Param() param) : Promise<Activity[]>{
        return this.activityService.findByCategory(param.id);
    }
    

    @Get('educator/:id')
    async getAllByEducator(@Param() param): Promise<Activity[]>{
        return this.activityService.findByEducator(param.id);
    }

    @Get('student/:id')
    async getAllByStudent(@Param() param): Promise<Activity[]>{
        return this.activityService.findByStudent(param.id);
    }

    // @Post("create")
    // createUpdate(@Body() createUpdateActivityDto :CreateUpdateActivityDto) : string{
    //     return (`this is from the body ${createUpdateActivityDto.name}`)
    // }

    @Post("create")
    async create(@Body() createUpdateActivityDto: CreateUpdateActivityDto, @Request() req) : Promise<Activity>{
        // createUpdateActivityDto.educatorID = req.user._id
        return this.activityService.create(createUpdateActivityDto);
    }

    @Post('update/:id')
    async update(@Body() createUpdateActivityDto: CreateUpdateActivityDto, @Param() param){
        return this.activityService.update(param.id, createUpdateActivityDto)
    }

    @Delete(':id')
    delete(@Param() param) : string {
        return `deleted ${param.id}`
    }
    @Get(':id')
    async getOne(@Param() param): Promise<Activity>{
        return this.activityService.findOne(param.id);
    }
}
