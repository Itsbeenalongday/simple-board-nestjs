import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  index(): Board[] {
    return this.boardsService.getAllBoards();
  }

  // whiteList
  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    console.log(title, description);
    return this.boardsService.createBoard(title, description);
  }
}
