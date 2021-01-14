import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidadtorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { CreateCustomerDto } from '../dtos/create.customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async get(): Promise<Result> {
    const customers = await this.customerService.findAll();
    return new Result(null, true, customers, null);
  }

  @Get(':document')
  async getById(@Param('document') document: string): Promise<Result> {
    const customer = await this.customerService.findByDocument(document);
    return new Result(null, true, customer, null);
  }

  @Post('query')
  async query(@Body() model: QueryDto): Promise<Result> {
    const customers = await this.customerService.query(model);
    return new Result(null, true, customers, null);
  }

  @Post()
  @UseInterceptors(new ValidadtorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto): Promise<Result> {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
      );

      const customer = await this.customerService.create(
        new Customer(
          model.name,
          model.document,
          model.email,
          [],
          null,
          null,
          null,
          user,
        ),
      );

      return new Result('Cliente criado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidadtorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      const customer = await this.customerService.addBillingAddress(
        document,
        new Address(
          model.zipCode,
          model.street,
          model.number,
          model.complement,
          model.neighborhood,
          model.city,
          model.state,
          model.country,
        ),
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

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidadtorInterceptor(new CreateAddressContract()))
  async addBillingShipping(
    @Param('document') document: string,
    @Body() model: Address,
  ) {
    try {
      const customer = await this.customerService.addBillingShipping(
        document,
        model,
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

  @Post(':document/pets')
  @UseInterceptors(new ValidadtorInterceptor(new CreatePetContract()))
  async addPet(@Param('document') document: string, @Body() model: Pet) {
    try {
      const customer = await this.customerService.createPet(document, model);
      return new Result('Endereço alterado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar seu pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/pets/:petId')
  @UseInterceptors(new ValidadtorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('petId') petId: string,
    @Body() model: Pet,
  ) {
    try {
      const customer = await this.customerService.updatePet(
        document,
        petId,
        model,
      );
      return new Result('Endereço alterado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar seu pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  put(@Param('document') document: string, @Body() body: any): Result {
    return new Result('Cliente alterado com sucesso!', true, body, null);
  }

  @Delete(':document')
  delete(@Param('document') document: string): Result {
    return new Result('Cliente removido com sucesso!', true, null, null);
  }
}
