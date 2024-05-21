import mongoose from "mongoose";

const mongooseScima = new mongoose.Schema({
    user:String,
    message:String,
    time:{
        type:Date,
        default:Date()
    }
})
const mongooseModel = mongoose.model('chate',mongooseScima)



/* new mongoose.model("chate",new mongoose.Schema({
    user:String,
    message:String,
    time:{
        type:Date,
        default:Date()
    }
})) */
export {mongooseModel}