import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Educator } from './interfaces/educator.interface';
import { Model } from 'mongoose';
import { Student } from './interfaces/student.interface';
import { User } from './interfaces/user.interface';
import { Rating } from '../educator-rating/interfaces/rating.interface'
import { CreateUpdateEducatorDto } from './dto/create_educator.dto';
import { CreateUpdateStudentDto } from './dto/create_student.dto';
import * as aws from 'aws-sdk';
import * as multer from 'multer'
import * as multerS3 from 'multer-s3';
import * as path from 'path';
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

    async searchByName(name: string) : Promise<any> {
        return this.userModel.find({"name" : {"$regex": name, "$options": "i"}});
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


    
    async addImage(username: string, file:any, urlKey: string) : Promise<any>{
        const params = {
            Body: file.buffer,
            Bucket: 'fuse2020',
            Key: urlKey
          };

        const s3 = new aws.S3({
            accessKeyId: process.env.S3_KEYID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            
        });

        console.log(username)
        // return this.userModel.findOneAndUpdate({username: username}, {$addToSet:{imageurl: urlKey}}, {useFindAndModify: false})
       

        // await this.userModel.updateOne(
        //     {username: username},
        //     {$set:{"imageurl": urlKey}},
        //     )
        //     .then((data)=>{
        //         console.log(data);
        //         console.log('hello updated')
        //         return ('updated db')
        //         // console.log('image url updated ' + data);
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        s3.putObject(params)
            .promise().then((res)=>{
                this.userModel.findOneAndUpdate({username: username}, {$set : {image_url: urlKey}}, {useFindAndModify: false}).then((res)=>{return "success"}).catch(err => {return err})
                return urlKey;
            }).catch((err)=> {return err})
          
        
    }

    // async imageUpload(username: string, file : any) {
      
    //     const s3 = new aws.S3({
    //         accessKeyId: process.env.S3_KEYID,
    //         secretAccessKey: process.env.S3_ACCESS_KEY,
            
    //        });
        
    //     const profileImgUpload = multer({
    //         storage: multerS3({
    //         s3: s3,
    //         bucket: 'fuse2020',
    //         acl: 'public-read',
    //         key: function (req, file, cb) {
    //         cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    //         }
    //         }),
    //         limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    //     }).single('uploadedimg');

    //     profileImgUpload( file, ( error ) => {
    //         console.log(file)
    //         if (error) {
    //             console.log(error)
    //         }else{
    //             if (file===undefined){
    //                 console.log('no file selected')
    //             }else{
    //                     const imageName = file.key;
    //                     const imageLocation = file.location;
    //                     console.log(imageName)

    //                     this.userModel.updateOne(
    //                         {username: username},
    //                         {$set:{imageurl: imageLocation}},
    //                         )
    //                         .then((data)=>{
    //                             console.log('image url updated ' + data);
    //                         })
    //                         .catch(err=>{
    //                             console.log(err)
    //                         })
                        
                        
    //                     }
    //                 }
        
    //         })
    // }

    
    
}
