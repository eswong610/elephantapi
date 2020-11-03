import * as mongoose from 'mongoose'

export const RatingSchema = new mongoose.Schema({
    educatorID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    caretakerID : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    activityID:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Activity"
    },
    rating:{
        type: Number,
        required: true,
    }
}, {timeStamp: true})