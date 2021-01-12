import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from '../models/address.model';
import { ICustomer } from '../models/customer.interface';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly Model: Model<ICustomer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const user = new this.Model(data);
    return await user.save();
  }

  async addBillingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.Model.findOneAndUpdate(
      { document },
      {
        $set: {
          billingAddress: data,
        },
      },
      options,
    );
  }
}
