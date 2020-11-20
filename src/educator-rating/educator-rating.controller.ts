import { Controller, Post, Get, Body, Param, UseGuards} from '@nestjs/common';
import { CreateRatingDto } from './dto/createratings.dto';
import { EducatorRatingService } from './educator-rating.service';
import { Rating } from './interfaces/rating.interface'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('educator-rating')
@UseGuards(JwtAuthGuard)
export class EducatorRatingController {
    constructor (private readonly educatorRatingService: EducatorRatingService) {}
    
    @Get("all")
    async getAll(): Promise<Rating[]>{
        return this.educatorRatingService.findAll();
    }

    @Get('educator/:id')
    async getEducatorRatings(@Param() param) {
        return this.educatorRatingService.findByID(param.id);
    }

    @Get('reviewer/:id')
    async getRatingsByReviewer(@Param() param) {
        return this.educatorRatingService.findByStudentID(param.id);
    }

    @Post("create-educator-rating")
    async createRating(@Body() createRatingDto: CreateRatingDto) : Promise<Rating>{
        return this.educatorRatingService.createRating(createRatingDto);
    }
}
