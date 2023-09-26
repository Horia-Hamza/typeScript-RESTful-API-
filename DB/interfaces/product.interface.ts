import { Document} from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
}
export interface ProoductId {
  id: string
}
export interface CreateProduct {
  name: string,
  description: string,
  price:number,
}

export interface UpdateProduct {
  name: string,
  description: string,
  price:number,
}