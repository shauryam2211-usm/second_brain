import express from "express" ;
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB, {  UserModel, ContentModel } from "./db";
import jwt from "jsonwebtoken"
import { userMiddleware } from "./middleware";
dotenv.config();
const app=express();
app.use(express.json());
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
  const username=req.body.username;
  const password=req.body.password;
  const user=await UserModel.findOne({username,
    password
  });
  if(user){
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn:"1h"});
    res.json({
      message:"User signed in successfully",  
      token
    });
  } else {
    res.status(401).json({
      error:"Invalid username or password"
    });
  }
})
app.post("/api/v1/content",userMiddleware,async (req,res)=>{

  const {title,link}=req.body;
    await ContentModel.create({
      title,
      link,
      tags: [],
      userID: (req as any).user.id
    });
    res.json({
      message:"Content created successfully"
    })
})
  
  
app.get("/api/v1/content",userMiddleware,(req,res)=>{

})
app.delete("/api/v1/content",userMiddleware,(req,res)=>{

})
app.post("/api/v1/brain/share",userMiddleware,(req,res)=>{

})
app.get("/api/v1/brain/shareLink",userMiddleware,(req,res)=>{

})
connectDB();

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
