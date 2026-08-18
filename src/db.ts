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
const ShareSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
});

const ShareModel = model("Share", ShareSchema);

export { ShareModel };
export default connectDB;