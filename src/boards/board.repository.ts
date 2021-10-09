import { NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board) // board를 컨트롤 하겠다.
export class BoardRepository extends Repository<Board> {
  async postBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create({
      status: BoardStatus.PUBLIC,
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
}
