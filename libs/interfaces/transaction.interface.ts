export interface Transaction {
  _id: string;
  confirmedDate: string;
  orderId: string;
  orderCode: string;
  transactionType: string;
  debit: number;
  credit: number;
  balance: number;
}
