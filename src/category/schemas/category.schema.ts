import * as mongoose from 'mongoose'

export const ActivitySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    description:{
        type: String,
       
    },
    is_active:{
        type: Boolean,
        required: true,
        default: true,
    }
    


}, {timestamps : true})