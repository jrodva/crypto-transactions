import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountsDocument = Accounts & Document;

export type Balance = {
  available: number;
  current: number;
};

@Schema()
export class Accounts {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  tags: string[];

  @Prop({ type: Object })
  balance: Balance;

  @Prop()
  transactions: string[];
}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);
