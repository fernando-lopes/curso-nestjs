import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
import { Model } from 'mongoose';
import { ICustomer } from '../models/customer.interface';
import { Customer } from '../models/customer.model';
import { IUser } from '../models/user.interface';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly Model: Model<IUser>,
    @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
  ) {}

  async create(data: User): Promise<IUser> {
    const user = new this.Model(data);
    return await user.save();
  }

  async authenticate(username: string, password: string): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ document: username })
      .populate('user')
      .exec();

    const pass = Md5.init(`${password}${process.env.SALT_KEY}`);
    if (pass.toString() == customer.user.password.toString()) {
      return customer;
    } else {
      return null;
    }
  }

  async update(username: string, data: any): Promise<User> {
    return await this.Model.findOneAndUpdate({ username }, data);
  }

  async findOneByUsername(username: string) {
    return new User(username, '12345678910', true, []);
  }
}
