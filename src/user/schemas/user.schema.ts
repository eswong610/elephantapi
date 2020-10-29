import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'


export const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4,  'Password must be 4 characters or more.']
    },
    description:{
        type: String,
        maxlength: [300, 'Max character count is 300 letters.']
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    phone_number: {
        type: String,
    },
    disability_name: {
        type: String,
    },
    disability_spectrum: {
        type: Number,
    },
    student_name: {
        type: String,
    },
    student_interests:{
        type: Array,
    },
    is_educator: {
        type: Boolean,
        default: false,
    },
    is_verified:{
        type: Boolean,
    },
    educator_rating:{
        type: Number,
    },
    image_url: {
        type: String,
    },
}, {timestamps : true})

// UserSchema.pre('save',  async function (next: mongoose.HookNextFunction) {
//     console.log('just before saving')
//     var user = this;
//     try{
//         if (!this.isModified('password')) {
//             return next();
//           }
//         const saltRounds = 10; // What you want number for round paasword
//         bcrypt.genSalt(saltRounds, function(err, salt) {
//             if(err) return next(err);
//             bcrypt.hash(user.password, salt, function(err, hash) {
//                 if(err) return next(err);
//                 // Store hash in your password DB.
//                 console.log(hash)
//                 user.password = hash;
//                 console.log(user.password)
                
//                 return next();
//             });
//         });
//     }catch(err) {
//         return next(err)
//     }
//   })
