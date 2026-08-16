import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
import {model , Schema} from "mongoose";
const UserSchema = new Schema({
  username : {type:String, unique : true},
  password : {type:String, required: true}
});
const UserModel= model("User", UserSchema);
export {UserModel};
const ContentSchema = new Schema({
   title : {type:String, required: true},
   link : {type:String, required: true},
   tags :[{type : mongoose.Types.ObjectId, ref : "User",required : true }],
   userID: {type : mongoose.Types.ObjectId, ref : "User",required : true }
}

)
export const ContentModel = model("Content", ContentSchema);
export default connectDB;