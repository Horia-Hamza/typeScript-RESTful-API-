import { Model, Schema, model } from "mongoose";
import {Product} from '../interfaces/product.interface'

const ProductSchema = new Schema<Product>({
   name: {
     type: String,
     required: [true, 'product name is required'],
     minlength: [2, 'min letters are 2'],
     maxlength: [20, 'max letters are 20'],
   },
   description: {
     type: String,
   },
   price: {
     type: Number,
      default: 1,
      required:true
   },
 });
 
 const UserModel: Model<Product> = model('Product', ProductSchema);
 
 export default UserModel;