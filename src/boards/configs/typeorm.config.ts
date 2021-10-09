import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yousungmin',
  password: 'insomenia',
  database: 'board',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // entity를 이용해서 데이터 베이스의 테이블을 생성합니다. 따러서 이 엔터티파일들의 위치를 지정해줘야합니다.
  synchronize: true, // true로 설정 시 애플리케이션 재실행 시, entity내에서 수정된 컬럼의 길이, 타입, 변경값 등을 테이블을 drop 후 재 생성합니다.
  logging: true,
  logger: 'advanced-console',
};
