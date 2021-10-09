import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';
import { DeleteResult } from 'typeorm';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.postBoard(createBoardDto);
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoard(id);
  }

  @Delete('/:id')
  destroy(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.boardsService.deleteBoard(id);
  }
}

// @Get()
// index(): Board[] {
//   return this.boardsService.getAllBoards();
// }

// @Delete('/:id')
// destroy(@Param('id') id: string): void {
//   return this.boardsService.destroyBoard(id);
// }

// @Patch('/:id')
// update(
//   @Param('id') id: string,
//   @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
// ): Board {
//   return this.boardsService.updateBoard(id, updateBoardDto);
// }
