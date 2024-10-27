import mongoose from "mongoose";
const connectToMongoDb=async()=>{
    try {
        console.log("Connected to MongoDb");
        
        await mongoose.connect(process.env.mongo);
    } catch (error) {
        console.log("Error Connecting to MongoDb");
        
    }
}
export default connectToMongoDb;