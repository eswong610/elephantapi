import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UsePipes, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import {UserService } from './user.service';
import { Educator } from './interfaces/educator.interface';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';
import { json } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { JoiValidationPipe } from'./shared/pipes/joi-validation.pipes';
import { UserSchema } from './schemas/user.schema'


@Controller('user')

export class UserController {
    constructor (private readonly userService: UserService) {}


    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    

    @Get('educators')
    @UseGuards(JwtAuthGuard)
    async getEducators(): Promise<Educator[]>{
        return this.userService.findAllEducators();
    }

   

    @Get('students')
    @UseGuards(JwtAuthGuard)
    async getStudents(): Promise<Student[]>{
        return this.userService.findAllStudents();
    }

    @Get('search/:searchword')
    @UseGuards(JwtAuthGuard)
    async searchUsers(@Param() param): Promise<any> {
        return this.userService.searchByName(param.searchword)
    }

    @Post("create-educator")
    async createEducator(@Body() createUpdateEducatorDto: CreateUpdateEducatorDto) {
        return this.userService.createEducator(createUpdateEducatorDto);
    }

    @Post('educator/update/:id')
    @UseGuards(JwtAuthGuard)
    async update(@Body() createUpdateEducatorDto: CreateUpdateEducatorDto, @Param() param){
        return this.userService.update(param.id, createUpdateEducatorDto)
    }

    
    @Post("create-student")
    // @UsePipes(new JoiValidationPipe(UserSchema))
    async createStudent(@Body() createUpdateStudentDto: CreateUpdateStudentDto) {
        return (this.userService.createStudentPromise(createUpdateStudentDto));
    }


    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file, @Request() req) {
        console.log(file);
        return this.userService.imageUpload(req.user.username, file);
    }

    @Get('educator/:id/rating')
    @UseGuards(JwtAuthGuard)
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

    @Post('connect/:username')
    @UseGuards(JwtAuthGuard)
    async addToConnection(@Param() param, @Request() req): Promise<User>{
        let didConnect = await this.userService.addToConnect(param.username, req.user._id)
        
        console.log(didConnect + 'connecte? ')
        return didConnect
    }

    @Get('connections')
    @UseGuards(JwtAuthGuard)
    async getConnections(@Request() req): Promise<User[]>{
        return this.userService.getUserConnections(req.user._id)
    }

     
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOneStudent(@Param() param): Promise<Student>{
        return this.userService.findById(param.id);
    }
    
}
