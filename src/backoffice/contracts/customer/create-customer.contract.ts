import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { CreateCustomerDto } from '../../dtos/create.customer-dto';
import { Contract } from '../contract';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: string[];

  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'E-Mail Inválido');
    flunt.isFixedLen(model.document, 11, 'CPF inválido');
    flunt.hasMinLen(model.password, 6, 'Senha Inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
