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

    async findOne(name: string) {
        console.log(name);
        return (this.categoryModel.findOne({name: name}));
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        console.log(this.createCategory)
        return createdCategory.save();
      }

    async addToParentCategory(name: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const dbCategory = await this.categoryModel.findOne({name: name}, (err, obj)=>{
            if (obj) {
                console.log('category found')
                return true  
            }else{
                console.log('category not found')
                return false;
            }
        })
        //sub category has no id
        console.log('add to parent category service');
        if (dbCategory) {
            console.log('findandupdate category')
            return this.categoryModel.findOneAndUpdate({_id: dbCategory._id}, {$addToSet : {children: createCategoryDto}}, {useFindAndModify: false})
        }

    }
}
