import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  
  
}

// @Get()
// index(): Board[] {
//   return this.boardsService.getAllBoards();
// }

// @Post()
// @UsePipes(ValidationPipe)
// create(@Body() createBoardDto: CreateBoardDto): Board {
//   return this.boardsService.createBoard(createBoardDto);
// }

// @Get('/:id')
// show(@Param('id') id: string): Board {
//   return this.boardsService.getBoard(id);
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
