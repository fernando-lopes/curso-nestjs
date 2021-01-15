import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidadtorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {
  constructor(private readonly service: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidadtorInterceptor(new CreatePetContract()))
  async create(@Param('document') document: string, @Body() model: Pet) {
    try {
      const customer = await this.service.create(document, model);
      return new Result('Endereço alterado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar seu pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidadtorInterceptor(new CreatePetContract()))
  async update(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ) {
    try {
      const customer = await this.service.update(document, id, model);
      return new Result('Endereço alterado com sucesso!', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível adicionar seu pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
