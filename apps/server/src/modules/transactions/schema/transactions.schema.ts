import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transaction } from '@libs/interfaces';

export type TransactionsDocument = Transaction & Document;

@Schema()
export class Transactions implements Transaction {
  @Prop({ required: true })
  _id: string;

  @Prop()
  balance: number;

  @Prop()
  confirmedDate: string;

  @Prop()
  credit: number;

  @Prop()
  debit: number;

  @Prop()
  orderCode: string;

  @Prop()
  orderId: string;

  @Prop()
  transactionType: string;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
