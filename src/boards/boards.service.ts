import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  postBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.postBoard(createBoardDto);
  }

  getBoard(id: number): Promise<Board> {
    return this.boardRepository.getBoard(id);
  }

  deleteBoard(id: number): Promise<DeleteResult> {
    return this.boardRepository.deleteBoard(id);
  }
}

// getAllBoards(): Board[] {
//   return this.boards;
// }

// destroyBoard(id: string): void {
//   const object = this.getBoard(id);
//   this.boards = this.boards.filter((board) => board.id != object.id);
// }

// updateBoard(id: string, updateBoardDto: UpdateBoardDto): Board {
//   const board = {
//     ...this.getBoard(id),
//     ...updateBoardDto,
//   };
//   this.destroyBoard(id);
//   this.boards.push(board);
//   return board;
// }
