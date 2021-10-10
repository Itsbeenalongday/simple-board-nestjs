import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  getBoards(): Promise<Board[]> {
    return this.boardRepository.getBoards();
  }

  postBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.postBoard(createBoardDto);
  }

  getBoard(id: number): Promise<Board> {
    return this.boardRepository.getBoard(id);
  }

  deleteBoard(id: number): Promise<DeleteResult> {
    return this.boardRepository.deleteBoard(id);
  }

  patchBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<UpdateResult> {
    return this.boardRepository.patchBoard(id, updateBoardDto);
  }
}
