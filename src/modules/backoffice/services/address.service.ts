import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressType } from '../enuns/address-type.enum';
import { Address } from '../models/address.model';
import { ICustomer } from '../models/customer.interface';
import { Customer } from '../models/customer.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer') private readonly Model: Model<ICustomer>,
    private readonly httpService: HttpService,
  ) {}

  async create(document: string, data: Address, type: AddressType): Promise<Customer> {
    const key = type === AddressType.Billing ? 'billingAddress' : 'shippingAddress';

    const options = { upsert: true };
    return await this.Model.findOneAndUpdate(
      { document },
      {
        $set: {
          [key]: data,
        },
      },
      options,
    );
  }

  getAddressByZipCode(zipcode: string) {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    return this.httpService.get(url);
  }
}
