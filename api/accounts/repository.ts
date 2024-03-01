import { dbQuery } from "..";
import { selectUserAccountById } from "./queries";
import { AccountDatabaseRow, AccountInfo } from "./types";

export const getUserBalance = async (accountId: number): Promise<AccountInfo | null> => {
  const dbResponse = await dbQuery(selectUserAccountById, [accountId]);
  if (!dbResponse.rows.length) return null;

  const dbRow: AccountDatabaseRow = dbResponse.rows[0];

  return {
    accountName: dbRow.name,
    amount: dbRow.amount,
    accountType: dbRow.type
  }
};
