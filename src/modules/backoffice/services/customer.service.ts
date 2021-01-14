import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryDto } from '../dtos/query.dto';
import { Address } from '../models/address.model';
import { ICustomer } from '../models/customer.interface';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';

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

  async addBillingShipping(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.Model.findOneAndUpdate(
      { document },
      {
        $set: {
          shippingAddress: data,
        },
      },
      options,
    );
  }

  async createPet(document, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true };
    return await this.Model.findOneAndUpdate(
      { document },
      {
        $push: {
          pets: data,
        },
      },
      options,
    );
  }

  async updatePet(document, petId: string, data: Pet): Promise<Customer> {
    const options = { upsert: true, new: true };
    return await this.Model.findOneAndUpdate(
      { document, 'pets._id': petId },
      {
        $set: {
          'pets.$': data,
        },
      },
      options,
    );
  }

  async findAll(): Promise<Customer[]> {
    const attributes = ['name', 'email', 'document'];
    return await this.Model.find({}, attributes.join(' ')).exec();
  }

  async findByDocument(document: string): Promise<Customer> {
    return await this.Model.findOne({ document })
      .populate('user', 'username')
      .exec();
  }

  async query(model: QueryDto): Promise<Customer[]> {
    return await this.Model.find(model.query, model.fields, {
      skip: model.skip,
      limit: model.take,
    })
      .sort(model.sort)
      .exec();
  }
}
