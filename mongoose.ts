import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://ajitkumarpalecb:9099104534@cluster0.weltffc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chatApp")
        /* await mongoose.connect("mongodb+srv://ajitkumarpalecb:OLPBRFhhBhU2WgFF@cluster0.weltffc.mongodb.net/chatApp") */
        console.log("BD connected using mongoose")
    } catch (error) {
        console.log("DBConnection Error",error)
    }
    
}