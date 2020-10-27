import * as mongoose from 'mongoose'

export const ActivitySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },

    start_time: {
        type: Date,
        required : true,
    },
    end_time:{
        type: Date,
        required: true,
    },
    location :{
        type: String,
        required: true,
    },
    price :{
        type: Number,
    },
    is_active:{
        type: Boolean,
        required: true,
        default: true,
    },
    categoryID : {
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    educatorID : {
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref : "Educator"
    }
    //is_booked or studentID


}, {timestamps : true})