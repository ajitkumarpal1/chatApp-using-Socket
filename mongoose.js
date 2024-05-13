import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/chatApp")
        console.log("BD connected using mongoose")
    } catch (error) {
        console.log("DBConnection Error",error)
    }
    
}