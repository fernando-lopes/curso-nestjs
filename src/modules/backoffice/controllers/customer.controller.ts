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
import { CreateCreaditCardContract } from '../contracts/customer/create-credit-card.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from '../contracts/customer/update-customer.contract';
import { QueryContract } from '../contracts/query.contracts';
import { CreateCustomerDto } from '../dtos/customer/create.customer.dto';
import { UpdateCustomerDto } from '../dtos/customer/update.customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { CreditCard } from '../models/credit-card.model';
import { Customer } from '../models/customer.model';
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
  @UseInterceptors(new ValidadtorInterceptor(new QueryContract()))
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

  @Put(':document')
  @UseInterceptors(new ValidadtorInterceptor(new UpdateCustomerContract()))
  async put(
    @Param('document') document: string,
    @Body() body: UpdateCustomerDto,
  ): Promise<Result> {
    try {
      const customer = await this.customerService.update(document, body);
      return new Result(
        'Cliente atualizado com sucesso!',
        true,
        customer,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível realizar seu update', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':document')
  delete(): Result {
    return new Result('Cliente removido com sucesso!', true, null, null);
  }

  @Post(':document/credit-cards')
  @UseInterceptors(new ValidadtorInterceptor(new CreateCreaditCardContract()))
  async createCreditCard(
    @Param('document') document: string,
    @Body() model: CreditCard,
  ) {
    try {
      await this.customerService.saveOrUpdateCreditCard(document, model);
      return new Result('Cardão criado com sucesso!', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível criar seu cartão', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
