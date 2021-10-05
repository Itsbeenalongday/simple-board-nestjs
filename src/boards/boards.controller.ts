import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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
    return this.boardsService.getBoard(id);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string): void {
    return this.boardsService.destroyBoard(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Board {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }
}
