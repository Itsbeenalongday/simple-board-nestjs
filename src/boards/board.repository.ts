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
  async getBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board'); // board table에 대한 쿼리
    query.where('board.userId = :userId', { userId: user.id });
    return await query.getMany();
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

  async getBoard(id: number, user: User): Promise<Board> {
    const board = await this.findOne({ id, user });
    if (!board) throw new NotFoundException();
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<DeleteResult> {
    const board = await this.delete({ id, user }); // 두 조건으로 찾는다.
    if (board.affected === 0) throw new NotFoundException();
    return board;
  }

  async patchBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user: User,
  ): Promise<UpdateResult> {
    const board = this.update({ id, user }, updateBoardDto);
    return board;
  }
}
