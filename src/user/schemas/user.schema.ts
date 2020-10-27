import * as mongoose from 'mongoose'

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
        required: true
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
    caretaker_name: {
        type: String,
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