import mongoose from "mongoose";

const connectToMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.mongo);
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log("Error Connecting to MongoDb:", error.message);

        
    }
}
export default connectToMongoDb;