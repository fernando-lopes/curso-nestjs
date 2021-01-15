import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ValidadtorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { AddressType } from '../enuns/address-type.enum';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { AddressService } from '../services/address.service';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidadtorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      const customer = await this.service.create(
        document,
        model,
        AddressType.Billing,
      );

      return new Result('Endereço alterado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidadtorInterceptor(new CreateAddressContract()))
  async addBillingShipping(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      const customer = await this.service.create(
        document,
        model,
        AddressType.Shipping,
      );
      return new Result('Endereço alterado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
