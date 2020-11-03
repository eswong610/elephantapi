import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/createratings.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Rating} from './interfaces/rating.interface'

@Injectable()
export class EducatorRatingService {
    constructor(@InjectModel('Rating') private readonly ratingModel: Model<Rating>) {}
    
    async findAll() : Promise<Rating[]>{
        return this.ratingModel.find()
    }
    
    async createRating(createRatingDto: CreateRatingDto): Promise<Rating>{
        console.log(createRatingDto);
        const newRating = new this.ratingModel(createRatingDto)
        return newRating.save();
    }
}
