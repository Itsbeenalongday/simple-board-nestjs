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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // 토큰이 있어야만 가능
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  index(): Promise<Board[]> {
    return this.boardsService.getBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.postBoard(createBoardDto, user);
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoard(id);
  }

  @Delete('/:id')
  destroy(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Promise<UpdateResult> {
    return this.boardsService.patchBoard(id, updateBoardDto);
  }
}
