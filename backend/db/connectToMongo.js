import mongoose from "mongoose";

export const  connectToMongo=async ()=>{
    try {
        mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Mongoose connected");
    } catch (error) {
        console.log("Error Connecting Mongo")
    }
}