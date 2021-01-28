import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RoomBookService } from '../services/room-book.service';
import { BookRoomDto } from '../dtos/book-room.dto';
import { BookRoomCommand } from '../commands/book-room.command';
import { Result } from 'src/modules/backoffice/models/result.model';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('v1/rooms')
export class AgendaController {
  constructor(private readonly service: RoomBookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async book(@Req() request, @Body() model: BookRoomDto) {
    try {
      const command = new BookRoomCommand(request.user.document, model.roomId, model.date);
      await this.service.book(command);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível reservar sua sala', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
