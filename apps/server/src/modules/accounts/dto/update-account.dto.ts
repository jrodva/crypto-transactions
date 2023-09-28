import { IsNotEmpty } from 'class-validator';
import { Account } from '@libs/interfaces';

export class UpdateAccountDto implements Account {
  _id: string;

  @IsNotEmpty()
  name: string;

  balance: {
    available: number;
    current: number;
  };

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  tags: string[];

  transactions: string[];
}
