import { CreateBoardDto } from './dto/create-board.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  index(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  show(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string): void {
    return this.boardsService.destroyBoardById(id);
  }
}
