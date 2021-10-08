import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board) // board를 컨트롤 하겠다.
export class BoardRepository extends Repository<Board> {}
