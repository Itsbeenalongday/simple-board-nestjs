import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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

  getBoards(user: User): Promise<Board[]> {
    return this.boardRepository.getBoards(user);
  }

  postBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.postBoard(createBoardDto, user);
  }

  getBoard(id: number, user: User): Promise<Board> {
    return this.boardRepository.getBoard(id, user);
  }

  deleteBoard(id: number, user: User): Promise<DeleteResult> {
    return this.boardRepository.deleteBoard(id, user);
  }

  patchBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user: User,
  ): Promise<UpdateResult> {
    return this.boardRepository.patchBoard(id, updateBoardDto, user);
  }
}
