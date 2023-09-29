import { IsArray, IsMongoId } from 'class-validator';

export class TransactionIdsDTO {
  @IsArray()
  @IsMongoId({ each: true })
  ids: string[];
}
