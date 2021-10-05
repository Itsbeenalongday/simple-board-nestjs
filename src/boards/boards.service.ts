import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: uuid(),
      status: BoardStatus.PUBLIC,
      ...createBoardDto,
    };

    this.boards.push(board);

    return board;
  }

  getBoard(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) throw new NotFoundException();

    return board;
  }

  destroyBoard(id: string): void {
    const object = this.getBoard(id);
    this.boards = this.boards.filter((board) => board.id != object.id);
  }

  updateBoard(id: string, updateBoardDto: UpdateBoardDto): Board {
    const board = {
      ...this.getBoard(id),
      ...updateBoardDto,
    };
    this.destroyBoard(id);
    this.boards.push(board);
    return board;
  }
}
