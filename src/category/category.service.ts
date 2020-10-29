import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface'
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create_category.dto'

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}
    
    async findAll(): Promise<Category[]>{
        return this.categoryModel.find(); //is active or not
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(CreateCategoryDto)
        return createdCategory.save();
      }
}
