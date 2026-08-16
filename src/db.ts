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
export default connectDB;