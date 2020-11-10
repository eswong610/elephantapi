import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Educator } from './interfaces/educator.interface';
import { Model } from 'mongoose';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { Rating } from '../educator-rating/interfaces/rating.interface'
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';
import { exception } from 'console';
import {validate } from 'class-validator'



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

    async findAllEducators() : Promise<User[]> {
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

    async createEducator(createEducatorDto: CreateUpdateEducatorDto) {

        let valError = ""
        let dbUser = await this.userModel.findOne({username: createEducatorDto.username},(err,obj)=>{
            if (!obj) {
                console.log('no object found')
                const createdEducator = new this.userModel(createEducatorDto)
                return createdEducator.save();
            }else{
                console.log('user exist')
                valError = "An account with this email already exists";
                
            }
        })

        let result = await valError.length ? valError : "User created";

        return result;
        // let dbUser = this.userModel.findOne({username: createEducatorDto.username}, (err,obj)=>{
        //     if (!obj) {

                // const createdEducator = new this.userModel(createEducatorDto)
                // return createdEducator.save();
        //     }else{
        //         return null;
        //     }

        // })

        // return dbUser;

      }

    async update(id:string, createEducatorDto: CreateUpdateEducatorDto) : Promise<Educator>{
        let dbActivity = this.userModel.find({_id: id});
        return this.userModel.findOneAndReplace({_id : id}, createEducatorDto)
    }


    async createStudentPromise(createStudentDto: CreateUpdateStudentDto)  {
        let valError = ""
        let dbUser = await this.userModel.findOne({username: createStudentDto.username},(err,obj)=>{
            if (!obj) {
                console.log('no object found')
                const createdStudent = new this.userModel(createStudentDto)
                return createdStudent.save();
            }else{
                console.log('user exist')
                valError = "An account with this email already exists";
                
            }
        })

        let result = await valError.length ? valError : "User Created";

        return result;
        // if (valError.length){
        //     return valError;
        // }else{
        //     return dbUser;
        // }
            
    }


    async createStudent(createStudentDto : CreateUpdateStudentDto) {
        const createdStudent = new this.userModel(createStudentDto)
        return createdStudent.save();
    }
    // async createStudent(createStudentDto: CreateUpdateStudentDto) {
    //     console.log('creating student')

    //     //make into promise? 

    //     const errorValidation = []
    //     let dbUser = await this.userModel.findOne({username: createStudentDto.username}, (err, obj)=>{
    //         if (!obj) {
    //             return obj;
    //         }else{
    //             console.log('dbuser else')
    //             errorValidation.push(err)
    //             return null
    //             // errorValidation.push("Username already taken") 
    //         }
    //     })

    //     if (!dbUser){

    //         const createdStudent = new this.userModel(createStudentDto)
    //         // console.log(createdStudent)
    //         console.log('createdStudent')
    //         createdStudent.save();
    //     }

    //     console.log(errorValidation)

    //     if (errorValidation.length){
    //         return errorValidation
    //     }else{
    //         return dbUser
    //     }
    //     // if (!isUser) {
    //     //     const createdStudent = new this.userModel(createStudentDto)
    //     //     console.log('createdStudent')
    //     //     console.log(createdStudent);
    //     //     return createdStudent.save();
    //     // }

    //     // console.log(dbUser)
    //     // return null
    // }

    async addToConnect(username: string, userID: string): Promise<User> {
        const dbConnectee = await this.userModel.findOne({username: username}, (err, obj)=>{
            if (obj) {
                return true  
            }else{
                return false;
            }
        })
        if (dbConnectee) {
            return this.userModel.findOneAndUpdate({_id: userID}, {$addToSet : {connected_users: username}}, {useFindAndModify: false})
        }

        
        
        
    }

    async getUserConnections(userID : string): Promise<User[]>{
        console.log(userID);
        const dbUser = await this.userModel.findOne({_id: userID});
        let dbUserConnections =[]
        for (let i =0 ; i < dbUser.connected_users.length; i++) {
            let connectedUser = await this.findConnectedUser(dbUser.connected_users[i])
            dbUserConnections.push(connectedUser)
        }
        // let dbUserConnections = await dbUser.connected_users.map(username => this.findConnectedUser(username))
        
        // dbUser.connected_users.map(x => dbUserConnections.push(this.userModel.find({username: x})))
        
        // // const dbUserConnection = await (dbUser.connected_users).foreach(username => dbUserConnections.push(this.userModel.find({username: username})))
        // return dbUserConnections;

        return dbUserConnections;
    }

    private findConnectedUser(username: string) {
        let dbUser = this.userModel.findOne({username: username}, (err, obj)=>{
            if (obj){
                console.log(obj)
                return obj
            }else{
                return null;
            }
        })
        console.log(dbUser)
        
        return dbUser
    }
    
}
