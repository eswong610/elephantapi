import * as mongoose from 'mongoose'

export const BookingSchema = new mongoose.Schema({
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
    is_paid:{
        type: Boolean,
        required: true,
    }
})