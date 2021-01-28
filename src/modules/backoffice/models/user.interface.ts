import { Document } from 'mongoose';
export interface IUser extends Document {
  username: string;
  password: string;
  active: boolean;
  roles: string[];
}
