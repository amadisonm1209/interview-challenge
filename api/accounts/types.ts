export type Account = {
  accountNumber: number;
  accountName: string;
  amount: number;
  accountType: "checking" | "savings" | "credit";
  creditLimit: number | null;
};

export type AccountInfo = Omit<Account, "accountNumber">;

export type AccountDatabaseRow = {
  account_number: number;
  name: string;
  amount: number;
  type: "checking" | "savings" | "credit";
  credit_limit: number | null;
};

export type WithdrawalLedger = {
  accountNumber: number;
  amount: number;
  transactionDate: Date;
};

export type WithdrawalDatabaseRow = {
  account_number: number;
  amount: number;
  transaction_date: Date;
};
