import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidadtorInterceptor } from 'src/interceptors/validator.interceptor';
import { CustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDto } from '../dtos/create.customer-dto';
import { Result } from '../models/result.model';

@Controller('v1/customers')
export class CustomerController {
  @Get()
  get(): Result {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document: string): Result {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidadtorInterceptor(new CustomerContract()))
  post(@Body() body: CreateCustomerDto): Result {
    return new Result('Cliente criado com sucesso!', true, body, null);
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
