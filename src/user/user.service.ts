import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Educator } from './interfaces/educator.interface';
import { Model } from 'mongoose';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { Rating } from '../educator-rating/interfaces/rating.interface'
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, @InjectModel('Rating') private readonly ratingModel: Model<Rating>) {}
    
    async findAll(): Promise<User[]>{
        return this.userModel.find();
    }

    async findOneByUsername(username: string): Promise<User>{
        // console.log(this.userModel.findOne({username: username }))
        return this.userModel.findOne({username: username })
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findOne({_id: id})
    }

    async findAllEducators() : Promise<Educator[]> {
        return this.userModel.find({is_educator : true});
    }

    async getEducatorRating(id: string) : Promise<Rating[]> {
        // let avgRating = 0;
            return this.ratingModel.find({ educatorID : id}, 'rating')//function(err, docs) {
                
        //         // console.log(docs);
        //         let numberRating = [];
        //         docs.forEach(function (arrayItem) {
        //             numberRating.push(arrayItem.rating);
        //             console.log(numberRating);
        //         });
        //         // docs.foreach(x => numberRating.push(x.rating))
        //         let avgRating = numberRating.reduce((acc, val) => acc + val) / numberRating.length;
        //         console.log(avgRating)
                
        //         return 3;
        //     });

            // if (!avg){
            //     return 0
            // }

        // let numberRating = [];
        // console.log(dbRatings);
        // dbRatings.foreach(x => numberRating.push(x.rating))
        // let avgRating = numberRating.reduce((acc, val) => acc + val) / numberRating.length;
        
    }

    

    async findEducator(id: string): Promise<Educator> {
        return this.userModel.findOne({_id: id});
    }

    async findAllStudents() : Promise<Student[]> {
        return this.userModel.find({is_educator: false});
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
