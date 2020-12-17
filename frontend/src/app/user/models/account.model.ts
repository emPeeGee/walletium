export interface Account {
  name: string;
  color: string;
  amount: number;
  currency: string;
  userId: string;
}

export interface AccountsResult {
  accounts: Account[];
}
