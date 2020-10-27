import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {UserService } from './user.service';
import { Educator } from './interfaces/educator.interface';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';


@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('all')
    async getAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    // @Get('educator/:id')
    // async getOneEducator(@Param() param): Promise<Educator>{
    //     return this.userService.findEducator(param.id);
    // }

    // @Get('student/:id')
    // async getOneStudent(@Param() param): Promise<Student>{
    //     return this.userService.findStudent(param.id);
    // }

    // @Get('educators')
    // async getEducators(): Promise<Educator[]>{
    //     return this.userService.findAllEducators();
    // }

    // @Get('students')
    // async getStudents(): Promise<Student[]>{
    //     return this.userService.findAllStudents();
    // }

    @Post("create-educator")
    async createEducator(@Body() createUpdateEducatorDto: CreateUpdateEducatorDto) : Promise<Educator>{
        return this.userService.createEducator(createUpdateEducatorDto);
    }
    @Post("create-student")
    async createStudent(@Body() createUpdateStudentDto: CreateUpdateStudentDto) : Promise<Student>{
        return this.userService.createStudent(createUpdateStudentDto);
    }
    
}
