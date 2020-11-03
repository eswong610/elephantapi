import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {UserService } from './user.service';
import { Educator } from './interfaces/educator.interface';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';
import { json } from 'express';


@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('all')
    async getAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    async getOneStudent(@Param() param): Promise<Student>{
        return this.userService.findById(param.id);
    }

    @Get('educators')
    async getEducators(): Promise<Educator[]>{
        return this.userService.findAllEducators();
    }

    @Get('students')
    async getStudents(): Promise<Student[]>{
        return this.userService.findAllStudents();
    }

    @Post("create-educator")
    async createEducator(@Body() createUpdateEducatorDto: CreateUpdateEducatorDto) : Promise<Educator>{
        return this.userService.createEducator(createUpdateEducatorDto);
    }
    @Post("create-student")
    async createStudent(@Body() createUpdateStudentDto: CreateUpdateStudentDto) : Promise<Student>{
        return this.userService.createStudent(createUpdateStudentDto);
    }

    @Get('educator/:id/rating')
    getEducatorRating(@Param() param): Promise<number> {
        
        let avgRating = 'asdf'
        return this.userService.getEducatorRating(param.id)
        .then((res)=>{
            let numberRating = [];
            res.forEach(function (arrayItem) {
                numberRating.push(arrayItem.rating);
            })
            let avgRating = numberRating.reduce((acc, val) => acc + val) / numberRating.length;
            // console.log(avgRating)
            return avgRating;
        })
        .catch((err)=>{
            return 0
        })
        
        
        

    }

    
}
