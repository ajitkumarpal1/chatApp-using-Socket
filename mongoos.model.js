import mongoose from "mongoose";

export const mongooseModel = new mongoose.model("chate",new mongoose.Schema({
    user:String,
    message:String,
    time:{
        type:Date,
        default:Date()
    }
}))