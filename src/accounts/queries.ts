export const selectUserAccountById = `
    SELECT name, amount, type
    FROM accounts
    WHERE account_number = $1
`;