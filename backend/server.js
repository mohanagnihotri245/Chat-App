
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
const app=express();
dotenv.config();
const PORT=process.env.PORT||5000;
app.get("/yo",(req,res)=>{
    res.send("hello gggg hhhh");
});
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`server on ${PORT}`)
});
