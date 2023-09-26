export interface Account {
  _id: string;
  category: string;
  name: string;
  tags: string[];
  balance: {
    available: number;
    current: number;
  };
  transactions: string[];
}
