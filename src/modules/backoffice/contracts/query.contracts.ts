import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { QueryDto } from '../dtos/query.dto';
import { Contract } from './contract';

@Injectable()
export class QueryContract implements Contract {
  errors: string[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    if (!model.query) {
      model.query = {};
    }

    flunt.isGreaterThan(
      model.take,
      100,
      'Sua query não pode retornar mais que 100 itens',
    );

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
