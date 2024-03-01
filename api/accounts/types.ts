export type Account = {
    accountNumber: number;
    accountName: string;
    amount: number;
    accountType: 'checking' | 'savings' | 'credit';
}

export type AccountInfo = Omit<Account, 'accountNumber'>;

export type AccountDatabaseRow = {
    account_number: number;
    name: string;
    amount: number;
    type: 'checking' | 'savings' | 'credit';
}