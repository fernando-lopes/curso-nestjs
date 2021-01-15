import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICustomer } from '../models/customer.interface';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Customer') private readonly Model: Model<ICustomer>,
  ) {}

  async create(document: string, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true };
    return await this.Model.findOneAndUpdate(
      { document },
      { $push: { pets: data } },
      options,
    );
  }

  async update(document: string, id: string, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true };
    return await this.Model.findOneAndUpdate(
      { document, 'pets._id': id },
      { $set: { 'pets.$': data } },
      options,
    );
  }
}
