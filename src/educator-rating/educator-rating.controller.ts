import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateRatingDto } from './dto/createratings.dto';
import { EducatorRatingService } from './educator-rating.service';
import { Rating } from './interfaces/rating.interface'

@Controller('educator-rating')
export class EducatorRatingController {
    constructor (private readonly educatorRatingService: EducatorRatingService) {}
    
    @Get("all")
    async getAll(): Promise<Rating[]>{
        return this.educatorRatingService.findAll();
    }

    @Post("create-educator-rating")
    async createRating(@Body() createRatingDto: CreateRatingDto) : Promise<Rating>{
        return this.educatorRatingService.createRating(createRatingDto);
    }
}
