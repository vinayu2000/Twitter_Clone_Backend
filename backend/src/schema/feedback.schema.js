import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>Date.now()
    }
})
const Feedback = model('feedback',feedbackSchema)
export {Feedback,feedbackSchema}