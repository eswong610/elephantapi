import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService} from './category.service';
import { Category } from './interfaces/category.interface'


@Controller('category')
export class CategoryController {
    constructor (private readonly categoryService: CategoryService) {}

    @Get('all')
    async getAll(): Promise<Category[]>{
        return this.categoryService.findAll();
    }

}
