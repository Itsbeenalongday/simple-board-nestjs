import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getBoard(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);

    if (!board) throw new NotFoundException();

    return board;
  }
}

// private boards: Board[] = [];

// getAllBoards(): Board[] {
//   return this.boards;
// }

// createBoard(createBoardDto: CreateBoardDto): Board {
//   const board: Board = {
//     id: uuid(),
//     status: BoardStatus.PUBLIC,
//     ...createBoardDto,
//   };

//   this.boards.push(board);

//   return board;
// }

// getBoard(id: string): Board {
//   const board = this.boards.find((board) => board.id === id);

//   if (!board) throw new NotFoundException();

//   return board;
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
