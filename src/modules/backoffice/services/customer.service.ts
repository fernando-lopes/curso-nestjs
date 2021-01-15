import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update.customer.dto';
import { ICustomer } from '../models/customer.interface';
import { Customer } from '../models/customer.model';
import { CreditCard } from '../models/credit-card.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly Model: Model<ICustomer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const user = new this.Model(data);
    return await user.save();
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.Model.findOneAndUpdate({ document }, data);
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

  async saveOrUpdateCreditCard(
    document: string,
    data: CreditCard,
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.Model.findOneAndUpdate(
      { document },
      { $set: { card: data } },
      options,
    );
  }
}
