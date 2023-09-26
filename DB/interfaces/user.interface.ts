import { Document} from 'mongoose';

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  role: string
}
export interface CreateUser {
  userName: string;
  email: string;
  password: string;
  role?: string
}
