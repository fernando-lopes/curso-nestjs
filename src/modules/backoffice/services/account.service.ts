import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../models/user.interface';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
  constructor(@InjectModel('User') private readonly Model: Model<IUser>) {}

  async create(data: User): Promise<IUser> {
    const user = new this.Model(data);
    return await user.save();
  }
}
