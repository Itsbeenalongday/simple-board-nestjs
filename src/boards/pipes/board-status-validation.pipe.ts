import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metaData: ArgumentMetadata) {
    console.log('value', value);
    console.log('meta data', metaData);
    if (
      value.status &&
      !this.checkStatusValidation(value.status.toUpperCase())
    ) {
      throw new BadRequestException('잘못된 요청입니다.');
    }
    return value;
  }

  private checkStatusValidation(status: string) {
    return this.StatusOption.find((s) => s === status);
  }
}
