import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@EntityRepository(Board) // board를 컨트롤 하겠다.
export class BoardRepository extends Repository<Board> {
  async getBoards(): Promise<Board[]> {
    return this.find();
  }

  async postBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const board = this.create({
      status: BoardStatus.PUBLIC,
      user: user,
      ...createBoardDto,
    });
    await this.save(board);
    return board;
  }

  async getBoard(id: number): Promise<Board> {
    const board = await this.findOne(id);
    if (!board) throw new NotFoundException();
    return board;
  }

  async deleteBoard(id: number): Promise<DeleteResult> {
    const board = await this.delete(id);
    if (board.affected === 0) throw new NotFoundException();
    return board;
  }

  async patchBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<UpdateResult> {
    const board = this.update(id, updateBoardDto);
    return board;
  }
}
