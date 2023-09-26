import { Model, Schema, model } from "mongoose";
import {User} from '../interfaces/user.interface'

const userSchema = new Schema<User>({
   userName: {
     type: String,
     required: [true, 'user name is required'],
     minlength: [2, 'min letters are 2'],
     maxlength: [20, 'max letters are 20'],
   },
   email: {
     type: String,
     required: [true, 'email is required'],
     unique: true,
   },
   password: {
     type: String,
     required: [true, 'password is required'],
   },
    role: { type: String, default:"User", enum: ["User","Admin","Vendor"] }
 }
 ,
  {
    timestamps: true,
  });
 
 const UserModel: Model<User> = model('User', userSchema);
 
 export default UserModel;