import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Educator } from './interfaces/educator.interface';
import { Model } from 'mongoose';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    async findAll(): Promise<User[]>{
        return this.userModel.find();
    }

    async findOneByUsername(username: string): Promise<User>{
        return this.userModel.findOne({username: username })
    }

    async findAllEducators() : Promise<User[]> {
        return this.userModel.find();
    }

    async findEducator(id: string): Promise<Educator> {
        return this.userModel.findOne({_id: id});
    }

    async findAllStudents() : Promise<Student[]> {
        return this.userModel.find();
    }

    async findStudent(id: string): Promise<Student> {
        return this.userModel.findOne({_id: id});
    }

    async createEducator(createEducatorDto: CreateUpdateEducatorDto): Promise<Educator> {
        const createdEducator = new this.userModel(createEducatorDto)
        return createdEducator.save();
      }

    async createStudent(createStudentDto: CreateUpdateStudentDto): Promise<Student> {
        const createdStudent = new this.userModel(createStudentDto)
        return createdStudent.save();
    }

    
}
