import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CategoryService} from './category.service';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create_category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'



@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
    constructor (private readonly categoryService: CategoryService) {}

    @Get("all")
    async getAll(): Promise<Category[]>{
        console.log('hit all')
        return this.categoryService.findAll();
    }

   
    @Post("create-category")
    async createParentCategory(@Body() createCategoryDto: CreateCategoryDto) : Promise<Category>{
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Post("create-children/:name")
    async createChildrenCategory(@Body() createCategoryDto: CreateCategoryDto, @Param() params) : Promise<Category>{
        console.log('post to addtoparent');
        return this.categoryService.addToParentCategory(params.name, createCategoryDto);
    }

    @Get('findone/:name')
    async getOne(@Param() params): Promise<Category[]>{
        console.log('find one name')
        return this.categoryService.findOne(params.name);
    }
}
