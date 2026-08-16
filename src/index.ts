import express from "express" ;
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config();
import jwt from "jsonwebtoken"
import { UserModel} from "./db";
dotenv.config();
const app=express();
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.create({
            username: username,
            password: password
        });

        res.json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
});
app.post("/api/v1/signin",async (req,res)=>{

})
app.post("/api/v1/content",(req,res)=>{

})
app.get("/api/v1/content",(req,res)=>{

})
app.delete("/api/v1/content",(req,res)=>{

})
app.post("/api/v1/brain/share",(req,res)=>{

})
app.get("/api/v1/brain/shareLink",(req,res)=>{

})
connectDB();

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
