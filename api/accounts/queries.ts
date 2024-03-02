export const selectUserAccountById = `
    SELECT name, amount, type, credit_limit
    FROM accounts
    WHERE account_number = $1
`;

export const selectAmountById = `
    SELECT amount
    FROM accounts
    WHERE account_number = $1
`;

export const updateAmount = `
    UPDATE accounts
    SET amount=$2
    WHERE account_number = $1
`;

export const selectDailyWithdrawalsById = `
    SELECT account_number, amount, transaction_date
    FROM withdrawals
    WHERE account_number = $1
    AND transaction_date = CURRENT_DATE
`;

export const insertWithdrawalRecord = `
    INSERT INTO withdrawals (
        account_number,
        amount,
        transaction_date
    )
    VALUES ($1, $2, CURRENT_DATE)
    returning amount
`;
